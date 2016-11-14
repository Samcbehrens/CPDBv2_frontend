import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import TextInput from 'components/inline-editable/rich-text-editor/toolbar/input';
import * as inputStyles from 'components/inline-editable/rich-text-editor/toolbar/input.style';

describe('TextInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger onBlur on blur', function () {
    const onBlurSpy = spy();

    instance = renderIntoDocument(
      <TextInput onBlur={ onBlurSpy } />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.blur(inputElement);
    onBlurSpy.called.should.be.true();
  });

  it('should trigger onFocus on focus', function () {
    const onFocusSpy = spy();

    instance = renderIntoDocument(
      <TextInput onFocus={ onFocusSpy } focusAfterMount={ false } />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.focus(inputElement);
    onFocusSpy.called.should.be.true();
  });

  it('should trigger onChange on input change', function () {
    const onChangeSpy = spy();

    instance = renderIntoDocument(
      <TextInput onChange={ onChangeSpy } />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.value = 'value';
    Simulate.change(inputElement);
    onChangeSpy.called.should.be.true();
    inputElement.value.should.eql('value');
  });

  it('should trigger onFocus on focus', function () {
    const onFocusSpy = spy();

    instance = renderIntoDocument(
      <TextInput onFocus={ onFocusSpy } focusAfterMount={ false } />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.focus(inputElement);
    onFocusSpy.called.should.be.true();
  });

  it('should have wrapperStyle base on width and height', function () {
    const width = 1;
    const height = 1;
    const wrapperStyleStub = stub(inputStyles, 'wrapperStyle');
    wrapperStyleStub.withArgs(width, height).returns({ fontSize: '1px' });

    instance = renderIntoDocument(
      <TextInput width={ width } height={ height } />
    );
    const wrapperElement = scryRenderedDOMComponentsWithTag(instance, 'div')[0];
    wrapperElement.style.fontSize.should.eql('1px');
  });

  it('should have inputStyle base on paddingVertical and paddingHorizontal', function () {
    const paddingVertical = 1;
    const paddingHorizontal = 1;
    const inputStyleStub = stub(inputStyles, 'inputStyle');
    inputStyleStub.withArgs(paddingVertical, paddingHorizontal).returns({ fontSize: '1px' });

    instance = renderIntoDocument(
      <TextInput paddingVertical={ paddingVertical } paddingHorizontal={ paddingHorizontal } />
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.style.fontSize.should.eql('1px');
  });

  it('should have placeholderStyle base on height, paddingVertical and paddingHorizontal', function () {
    const height = 1;
    const paddingVertical = 1;
    const paddingHorizontal = 1;
    const placeholderStyleStub = stub(inputStyles, 'placeholderStyle');
    placeholderStyleStub.withArgs(height, paddingVertical, paddingHorizontal).returns({ fontSize: '1px' });

    instance = renderIntoDocument(
      <TextInput height={ height } paddingVertical={ paddingVertical } paddingHorizontal={ paddingHorizontal } />
    );
    const placeholderElement = scryRenderedDOMComponentsWithTag(instance, 'div')[1];
    placeholderElement.style.fontSize.should.eql('1px');
  });
});
