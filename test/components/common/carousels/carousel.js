import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
  Simulate
} from 'react-addons-test-utils';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import ReactDOM from 'react-dom';
import { stub } from 'sinon';
import _ from 'lodash';

import { OfficerCardFactory } from 'utils/test/factories/activity-grid';
import Carousel from 'components/common/carousel';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';


describe('Carousel components', function () {
  let instance;
  let consoleStub;
  let renderCarouselSuppressWarningProps;

  before(function () {
    consoleStub = stub(console, 'error'); //suppress console.error `Swiper`
    renderCarouselSuppressWarningProps = function (data, headerNode = '', description = '') {
      const slides = data.map((item) => {
        const attr = _.omit(item, 'id');
        return <OfficerCard key={ item.id } { ...attr } officerId={ item.id }/>;
      });
      return renderIntoDocument(
        <Carousel headerSection={ headerNode }>
          { slides }
        </Carousel>
      );
    };
  });

  after(function () {
    // TODO: ensure that this console.error is belong to `Swiper` and appear once time only
    // 'Invalid prop `children` supplied to `ReactIdSwiper`.'
    consoleStub.restore();
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not render if no data', function () {
    instance = renderIntoDocument(
      <Carousel/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--wrapper').should.be.empty();
  });

  it('should render appropriately if few data provided', function () {
    const data = [{
      'id': 1,
      'visualTokenBackgroundColor': '#c6d4ec',
      'fullName': 'Manuel Guzman',
      'complaintCount': 13,
      'sustainedCount': 0,
      'birthYear': 1974,
      'complaintPercentile': 84.5,
      'race': 'Hispanic',
      'gender': 'Male'
    }, {
      'id': 2,
      'fullName': 'Jerome Finnagan',
      'complaintCount': 55,
      'sustainedCount': 22,
      'birthYear': 1979,
      'complaintPercentile': 94.5,
      'race': 'White',
      'gender': 'Male'
    }];

    instance = renderCarouselSuppressWarningProps(data, 'HEADER');

    findRenderedDOMComponentWithClass(instance, 'test--carousel--wrapper');
    const header = findRenderedDOMComponentWithClass(instance, 'test--carousel--header');
    header.textContent.should.containEql('HEADER');
    instance.props.children.should.have.length(2);
    const items = scryRenderedComponentsWithType(instance, OfficerCard);
    items.should.have.length(2);
    ReactDOM.findDOMNode(items[0]).textContent.should.containEql('Manuel Guzman');
    ReactDOM.findDOMNode(items[1]).textContent.should.containEql('Jerome Finnagan');
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--arrow--right').should.have.length(0);
  });

  it('should show the right arrow if there are many elements', function () {
    const data = OfficerCardFactory.buildList(10);  // larger than viewport-size
    instance = renderCarouselSuppressWarningProps(data);
    findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--right');
  });

  it('should hide right arrow if meet the end of items', function () {
    const data = OfficerCardFactory.buildList(10);  // larger than viewport-size
    instance = renderCarouselSuppressWarningProps(data);
    const arrowWrapper = findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--right');
    Simulate.click(arrowWrapper);
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--arrow--right').should.have.length(0);
  });

  it('should show the left arrow if current slide not beginning', function () {
    const data = OfficerCardFactory.buildList(10);  // larger than viewport-size
    instance = renderCarouselSuppressWarningProps(data);
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--arrow--left').should.have.length(0);
    const arrowWrapper = findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--right');

    instance.state.numVisibleSlide.should.equal(6);
    Simulate.click(arrowWrapper);
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--arrow--left').should.have.length(1);
  });

  it('should update the number of slide to scroll when window size change', function () {
    const data = OfficerCardFactory.buildList(20);  // larger than viewport-size
    let instance = renderCarouselSuppressWarningProps(data);
    instance.state.numVisibleSlide.should.equal(6);
    instance.swiper.activeIndex.should.equal(0);
    const rightArrowWrapper = findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--right');
    Simulate.click(rightArrowWrapper);
    instance.swiper.activeIndex.should.equal(6);

    global.innerWidth = 1000; // Change the viewport to 1000px.
    global.dispatchEvent(new Event('resize')); // Trigger the window resize event.

    instance.state.numVisibleSlide.should.equal(2);
    const leftArrowWrapper = findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--left');
    Simulate.click(leftArrowWrapper);
    instance.swiper.activeIndex.should.equal(4);
  });

  it('should update the state of the component when the data prop changed', function () {
    const slides = _.range(2).map((i) => (<div key={ i }> { i } </div>));
    instance = renderIntoDocument(<Carousel>{ slides }</Carousel>);
    instance.state.displayRightArrow.should.be.false();

    const newSlides = _.range(10).map((i) => (<div key={ i }> { i } </div>));
    instance = reRender(<Carousel>{ newSlides }</Carousel>, instance);
    instance.state.displayRightArrow.should.be.true();
  });
});
