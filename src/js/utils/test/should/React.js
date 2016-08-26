import React, { createElement } from 'react';
import { Provider } from 'react-redux';
import { unmountComponentAtNode, findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import should from 'should';
import { each, assign } from 'lodash';
import { spy } from 'sinon';

import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


should.Assertion.add('renderable', function (props) {
  this.params = { operator: 'to be rendered' };
  let element;
  if (props && props.store) {
    const { store, ...otherProps } = props;
    element = renderIntoDocument(
      <Provider store={ store }>
        { createElement(this.obj, otherProps) }
      </Provider>
    );
  } else {
    element = renderIntoDocument(createElement(this.obj, props));
  }

  element.should.be.ok();

  unmountComponentAtNode(findDOMNode(element).parentNode);
});


should.Assertion.add('responsiveRenderable', function (props) {
  let devices = [MOBILE, TABLET, DESKTOP, EXTRA_WIDE];

  each(devices, (device) => {
    let element = renderIntoDocument(createElement(this.obj, assign({}, props, { device: device })));
    element.should.be.ok();
    unmountComponentAtNode(findDOMNode(element).parentNode);
  });
});


should.Assertion.add('displayNothing', function () {
  should(findDOMNode(this.obj)).be.null();
});


should.Assertion.add('displaySomething', function () {
  should(findDOMNode(this.obj)).not.be.null();
});


should.Assertion.add('triggerCallbackWhenClick', function (callbackProp, target=null, props={}, expectedArg=null) {
  const callback = spy();
  let element = renderIntoDocument(createElement(this.obj, assign({}, props, { [callbackProp]: callback })));

  if (typeof target === 'string') {
    Simulate.click(scryRenderedDOMComponentsWithClass(element, target)[0]);
  } else {
    Simulate.click(findDOMNode(element));
  }

  if (expectedArg !== null) {
    callback.calledWith(expectedArg).should.be.true();
  } else {
    callback.called.should.be.true();
  }

  unmountComponentAtNode(findDOMNode(element).parentNode);
});
