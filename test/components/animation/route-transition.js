import React from 'react';
import { findDOMNode, render } from 'react-dom';

import RouteTransition from 'components/animation/route-transition';
import {
  unmountComponentSuppressError,
  withAnimationDisabled,
  reRender
} from 'utils/test';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';


describe('RouteTransition component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should give the same key for same officer path', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/officer/1/'>
        some summary
      </RouteTransition>
    );
    element.getRouteTransitionKey().should.eql('officer/1');

    element = reRender(
      <RouteTransition pathname='/officer/1/timeline/'>
        some timeline
      </RouteTransition>,
      element
    );
    element.getRouteTransitionKey().should.eql('officer/1');
  });

  it('should give the same key for same CR path', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/complaint/1/2/'>
        complaint for some officer
      </RouteTransition>
    );
    element.getRouteTransitionKey().should.eql('complaint/1');

    element = reRender(
      <RouteTransition pathname='/complaint/1/3/'>
        complaint for other officer
      </RouteTransition>,
      element
    );
    element.getRouteTransitionKey().should.eql('complaint/1');

    element = reRender(
      <RouteTransition pathname='/complaint/1/'>
        complaint for other officer
      </RouteTransition>,
      element
    );
    element.getRouteTransitionKey().should.eql('complaint/1');
  });

  it('should give the same key for search paths', function () {
    element = renderIntoDocument(
      <RouteTransition pathname='/search/'>
        complaint for some officer
      </RouteTransition>
    );
    element.getRouteTransitionKey().should.eql('search');

    element = reRender(
      <RouteTransition pathname='/search/terms/'>
        complaint for other officer
      </RouteTransition>,
      element
    );
    element.getRouteTransitionKey().should.eql('search');
  });

  context('animation disabled', function () {
    it('should render exactly children component', function () {
      withAnimationDisabled(() => {
        const children = <div className='test--sample-div' />;
        element = renderIntoDocument(
          <RouteTransition pathname='/path'>
            { children }
          </RouteTransition>
        );

        scryRenderedDOMComponentsWithClass(element, 'test--sample-div').length.should.equal(1);
      });
    });
  });

  context('animation enabled', function () {

    it('should render child', function () {
      let testText = 'should be rendered';
      element = renderIntoDocument(
        <RouteTransition pathname='/path'><p>{ testText }</p></RouteTransition>
      );
      findDOMNode(element).innerHTML.should.containEql(testText);
    });

    it('should eventually render new child', function (callback) {
      let rootEl = document.createElement('div');
      const testChildren = [
        {
          path: '/path1',
          text: 'a b c'
        },
        {
          path: '/path2',
          text: 'd e f'
        }
      ];

      element = render(
        <RouteTransition pathname={ testChildren[0].path }><p>{ testChildren[0].text }</p></RouteTransition>,
        rootEl);

      render(
        <RouteTransition pathname={ testChildren[1].path }><p>{ testChildren[1].text }</p></RouteTransition>,
        rootEl, () => {
          rootEl.innerHTML.should.containEql(testChildren[0].text);
          setTimeout(() => {
            rootEl.innerHTML.should.containEql(testChildren[1].text);
            callback();
          }, 300);
        });
    });
  });
});
