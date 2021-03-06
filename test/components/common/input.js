import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { reRender, unmountComponentSuppressError } from 'utils/test';
import TextInput from 'components/common/input';
import * as inputStyles from 'components/common/input.style';

describe('TextInput component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger onBlur on blur', function () {
    const onBlurSpy = spy();

    instance = renderIntoDocument(
      <TextInput onBlur={ onBlurSpy }/>
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.blur(inputElement);
    onBlurSpy.called.should.be.true();
  });

  it('should trigger onFocus on focus', function () {
    const onFocusSpy = spy();

    instance = renderIntoDocument(
      <TextInput onFocus={ onFocusSpy } autoFocus={ false }/>
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.focus(inputElement);
    onFocusSpy.called.should.be.true();
  });

  it('should trigger onChange on input change', function () {
    const onChangeSpy = spy();

    instance = renderIntoDocument(
      <TextInput onChange={ onChangeSpy }/>
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
      <TextInput onFocus={ onFocusSpy } autoFocus={ false }/>
    );
    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.focus(inputElement);
    onFocusSpy.called.should.be.true();
  });

  it('should trigger internal input focus on focus', function () {
    const onFocusSpy = spy();

    instance = renderIntoDocument(
      <TextInput onFocus={ onFocusSpy } autoFocus={ false }/>
    );

    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    const inputFocusSpy = spy(inputElement, 'focus');

    instance.focus();
    inputFocusSpy.called.should.be.true();
  });

  it('should have wrapperStyle base on width and height', function () {
    const width = 1;
    const height = 1;
    const wrapperStyleStub = stub(inputStyles, 'wrapperStyle');
    wrapperStyleStub.withArgs(width, height).returns({ fontSize: '1px' });

    instance = renderIntoDocument(
      <TextInput width={ width } height={ height }/>
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
      <TextInput paddingVertical={ paddingVertical } paddingHorizontal={ paddingHorizontal }/>
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
      <TextInput height={ height } paddingVertical={ paddingVertical } paddingHorizontal={ paddingHorizontal }/>
    );
    const placeholderElement = scryRenderedDOMComponentsWithTag(instance, 'div')[1];
    placeholderElement.style.fontSize.should.eql('1px');
  });

  it('should handle keys in keyPressHandlers', function () {
    const keyPressHandlers = {
      esc: spy(),
      enter: spy()
    };

    instance = renderIntoDocument(
      <TextInput keyPressHandlers={ keyPressHandlers }/>
    );

    instance.mousetrap.trigger('esc');
    keyPressHandlers.esc.calledOnce.should.be.true();

    instance.mousetrap.trigger('enter');
    keyPressHandlers.enter.calledOnce.should.be.true();
  });

  it('should focus when receiving new focused props', function () {
    instance = renderIntoDocument(<TextInput/>);
    const stubFocus = stub(instance.input, 'focus');
    stubFocus.called.should.be.false();

    instance = reRender(<TextInput focused={ true }/>, instance);
    stubFocus.called.should.be.true();
  });

  context('when blurOnKeyPress prop is provided', function () {
    it('should blur when an assigned key is pressed', function () {
      instance = renderIntoDocument(
        <TextInput blurOnKeyPress={ ['down'] }/>
      );
      const blur = stub(instance.input, 'blur');

      instance.mousetrap.trigger('down');
      blur.calledOnce.should.be.true();
    });
  });

  context('when keyPressWithBlurHandlers prop is provided', function () {

    it('should call handlers and blur when the keys are pressed', function () {
      const keyDownHandlerStub = stub();
      const keyUpHandlerStub = stub();
      const keyPressWithBlurHandlers = {
        down: keyDownHandlerStub,
        up: keyUpHandlerStub,
      };

      instance = renderIntoDocument(
        <TextInput keyPressWithBlurHandlers={ keyPressWithBlurHandlers }/>
      );
      const blur = spy(instance.input, 'blur');

      instance.mousetrap.trigger('down');
      keyDownHandlerStub.calledOnce.should.be.true();
      blur.calledOnce.should.be.true();

      Simulate.focus(instance.input);
      instance.mousetrap.trigger('up');
      keyDownHandlerStub.calledOnce.should.be.true();
      blur.calledTwice.should.be.true();
    });
  });
});
