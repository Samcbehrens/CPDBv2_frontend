import React from 'react';
import {
  renderIntoDocument, createRenderer, isElementOfType
} from 'react-addons-test-utils';
import { spy } from 'sinon';


import { wrap } from 'containers/resolving-page/with-pagination';


describe('withPagination', function () {
  let ChildComponent, WrappedComponent, fetchData, renderer, instance;

  beforeEach(() => {
    ChildComponent = (props) => {
      return (
        <div></div>
      );
    };

    fetchData = spy();
    WrappedComponent = wrap(ChildComponent);
    renderer = createRenderer();
  });

  it('should fetch data after the component is mounted', () => {
    instance = renderIntoDocument(
      <WrappedComponent fetchData={ fetchData } />
    );
    fetchData.called.should.be.true();
  });

  it('should render a child component', () => {
    renderer = createRenderer();
    instance = renderer.render(
      <WrappedComponent fetchData={ fetchData } nextUrl={ 'xyz' } />
    );

    isElementOfType(instance, ChildComponent).should.be.true();
  });

  describe('#handleNext', () => {
    it('should re-fetch data with next page', () => {
      instance = renderer.render(
        <WrappedComponent fetchData={ fetchData } nextUrl={ 'xyz' } />
      );

      instance.props.handleNext();

      fetchData.calledWith('xyz').should.be.true();
    });

    it('should do nothing if there is no next page', () => {
      instance = renderer.render(
        <WrappedComponent fetchData={ fetchData } nextUrl={ undefined } />
      );

      instance.props.handleNext();

      fetchData.called.should.be.false();
    });
  });

  describe('#handlePrevious', () => {
    it('should re-fetch data with previous page', () => {
      instance = renderer.render(
        <WrappedComponent fetchData={ fetchData } prevUrl={ 'xyz' } />
      );

      instance.props.handlePrevious();

      fetchData.calledWith('xyz').should.be.true();
    });

    it('should do nothing if there is no previous page', () => {
      instance = renderer.render(
        <WrappedComponent fetchData={ fetchData } prevUrl={ undefined } />
      );

      instance.props.handlePrevious();

      fetchData.called.should.be.false();
    });
  });
});
