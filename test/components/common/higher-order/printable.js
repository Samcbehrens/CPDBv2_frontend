import React, { Component } from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Printable from 'components/common/higher-order/printable';


describe('Printable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  class Dummy extends Component {
    componentDidMount() {
      document.title = 'Dummy title';
    }

    render() {
      return <div/>;
    }
  }

  const PrintableDummy = Printable(Dummy);

  it.only('should render header correctly', function () {
    const today = new Date().toLocaleDateString();

    instance = renderIntoDocument(<PrintableDummy/>);
    instance._mediaPrintListener({ matches: true });
    findRenderedDOMComponentWithClass(instance, 'left-header').textContent.should.eql('Dummy title');
    findRenderedDOMComponentWithClass(instance, 'printable-as-of').textContent.should.eql('AS OF');
    findRenderedDOMComponentWithClass(instance, 'printable-date').textContent.should.eql(`${today}`);
  });

  it('should add media listener', function () {
    const addListenerSpy = spy();
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: true,
          addListener: addListenerSpy
        };
      }
    });

    instance = renderIntoDocument(<PrintableDummy/>);
    addListenerSpy.calledWith(instance._mediaPrintListener).should.be.true();
  });

  it('should add onbeforeprint & onafterprint listener', function () {
    instance = renderIntoDocument(<PrintableDummy/>);
    window.onbeforeprint.should.be.eql(instance._beforePrint);
    window.onafterprint.should.be.eql(instance._afterPrint);
  });

  it('should set isPrinting state when _mediaPrintListener is called', function () {
    instance = renderIntoDocument(<PrintableDummy/>);

    instance._mediaPrintListener({ matches: true });
    instance.state.isPrinting.should.be.true();

    instance._mediaPrintListener({ matches: false });
    instance.state.isPrinting.should.be.false();
  });

  it('should set isPrinting when _beforePrint & _afterPrint is called', function () {
    instance = renderIntoDocument(<PrintableDummy/>);

    instance._beforePrint();
    instance.state.isPrinting.should.be.true();

    instance._afterPrint();
    instance.state.isPrinting.should.be.false();
  });
});
