import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import PercentilesByYear from 'components/officer-page/radar-chart/explainer/percentiles-by-year';
import StaticRadarChart from 'components/common/radar-chart';
import { unmountComponentSuppressError } from 'utils/test';


describe('PercentilesByYear components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    PercentilesByYear.should.be.renderable();
  });

  it('should render RadarChart by year (with reverse order)', function () {
    const data = [{
      year: 2015,
      visualTokenBackground: 'white',
      items: [
        { 'axis': 'Use of Force Report', value: 20 },
        { 'axis': 'Internal Complaints', value: 99.09 },
        { 'axis': 'Civilian Complaint', value: 90.6 }
      ]
    }, {
      year: 2016,
      visualTokenBackground: 'yellow',
      items: [
        { 'axis': 'Use of Force Report', value: 99.79 },
        { 'axis': 'Internal Complaints', value: 99.32 },
        { 'axis': 'Civilian Complaint', value: 60 }
      ]
    }];
    instance = renderIntoDocument(
      <PercentilesByYear yearlyRadarChartData={ data }/>
    );

    const rows = scryRenderedDOMComponentsWithClass(instance, 'test--radar-explainer-percentiles-row');
    const years = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-year-item');
    const trrPercentiles = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-trr-item');
    const internalPercentiles = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-internal-complaint-item');
    const civilPercentiles = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-civil-complaint-item');

    rows.should.have.length(2);
    years.should.have.length(2);
    trrPercentiles.should.have.length(2);
    internalPercentiles.should.have.length(2);
    civilPercentiles.should.have.length(2);

    years[0].textContent.should.equal('2016');
    trrPercentiles[0].textContent.should.equal('99.7');
    internalPercentiles[0].textContent.should.equal('99.3');
    civilPercentiles[0].textContent.should.equal('60');

    years[1].textContent.should.equal('2015');
    trrPercentiles[1].textContent.should.equal('20');
    internalPercentiles[1].textContent.should.equal('99');
    civilPercentiles[1].textContent.should.equal('90');

    scryRenderedComponentsWithType(instance, StaticRadarChart).should.have.length(2);
  });

  it('should render NaN percentile as blank', function () {
    const data = [{
      year: 2015,
      visualTokenBackground: 'white',
      items: [
        { 'axis': 'Use of Force Report', value: 0 },
        { 'axis': 'Internal Complaints', value: 0 },
        { 'axis': 'Civilian Complaint', value: NaN }
      ]
    }, {
      year: 2016,
      visualTokenBackground: 'yellow',
      items: [
        { 'axis': 'Use of Force Report', value: NaN },
        { 'axis': 'Internal Complaints', value: NaN },
        { 'axis': 'Civilian Complaint', value: 0 }
      ]
    }];
    instance = renderIntoDocument(
      <PercentilesByYear yearlyRadarChartData={ data }/>
    );

    const rows = scryRenderedDOMComponentsWithClass(instance, 'test--radar-explainer-percentiles-row');
    const years = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-year-item');
    const trrPercentiles = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-trr-item');
    const internalPercentiles = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-internal-complaint-item');
    const civilPercentiles = scryRenderedDOMComponentsWithClass(instance, 'test--yearly-civil-complaint-item');

    rows.should.have.length(2);
    years.should.have.length(2);
    trrPercentiles.should.have.length(2);
    internalPercentiles.should.have.length(2);
    civilPercentiles.should.have.length(2);

    years[0].textContent.should.equal('2016');
    trrPercentiles[0].textContent.should.equal('');
    internalPercentiles[0].textContent.should.equal('');
    civilPercentiles[0].textContent.should.equal('0');

    years[1].textContent.should.equal('2015');
    trrPercentiles[1].textContent.should.equal('0');
    internalPercentiles[1].textContent.should.equal('0');
    civilPercentiles[1].textContent.should.equal('');

    scryRenderedComponentsWithType(instance, StaticRadarChart).should.have.length(2);
  });
});
