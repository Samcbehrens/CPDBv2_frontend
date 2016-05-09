import 'should';
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import CloseButtonWrapper from 'components/stories/close-btn-wrapper';
import 'utils/test/React';
import { unmountComponentSuppressError } from 'utils/test';


describe('CloseButtonWrapper component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render', function () {
    CloseButtonWrapper.should.be.renderable();
  });

  it('should show CloseButton when showButton is true', function () {
    element = renderIntoDocument(<CloseButtonWrapper showButton={ true } buttonClassName='abc'/>);
    findRenderedDOMComponentWithClass(element, 'abc');
  });

  it('should hide CloseButton when showButton is false', function () {
    element = renderIntoDocument(<CloseButtonWrapper showButton={ false } buttonClassName='def'/>);
    scryRenderedDOMComponentsWithClass(element, 'def').length.should.equal(0);
  });

  it('should display nothing when expanded and showButton are both false', function () {
    element = renderIntoDocument(<CloseButtonWrapper showButton={ false } expanded={ false }/>);
    (findDOMNode(element) === null).should.be.true();
  });

  it('should display wrapper when expanded is true', function () {
    element = renderIntoDocument(<CloseButtonWrapper showButton={ false } expanded={ true }/>);
    (findDOMNode(element) === null).should.be.false();
  });
});
