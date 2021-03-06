import React from 'react';
import should from 'should';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';

import OfficerCard from 'components/common/officer-card';
import { getThisYear } from 'utils/date';
import RadarChart from 'components/common/radar-chart/radar-chart';


describe('OfficerCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <OfficerCard
        officerId={ 1 }
        fullName='Jerome Finnigan'
        visualTokenBackgroundColor='red'
        complaintCount={ 10 }
        sustainedCount={ 5 }
        complaintPercentile={ 20 }
        birthYear={ 1980 }
        race='white'
        gender='male'
        rank='Police Officer'
        percentile={ {
          items: [{ 'axis': 'a', value: 1 }]
        } }
      />
    );
    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/1/jerome-finnigan/');

    const radarChartElement = findRenderedDOMComponentWithClass(instance, 'test--radar');
    radarChartElement.getAttribute('width').should.eql('100%');
    radarChartElement.getAttribute('height').should.eql('100%');
    should(radarChartElement.querySelector('.test--radar-radar-area')).not.be.null();

    const text = findDOMNode(instance).innerText;
    text.should.containEql('Police Officer');
    text.should.containEql('Jerome Finnigan');
    text.should.containEql('10 Allegations');
    text.should.containEql('5 Sustained');
    text.should.containEql('More than 20% of other officers');

    const age = getThisYear() - 1980 - 1;
    text.should.containEql(`${age}-year-old white male`);
  });

  it('should show NoDataRadarChart when no percentile', () => {
    instance = renderIntoDocument(<OfficerCard officerId={ 3 }/>);
    const noDataRadarChart = findRenderedComponentWithType(instance, RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
  });

  it('should render link with target _blank when openCardInNewPage is true', () => {
    instance = renderIntoDocument(<OfficerCard officerId={ 3 } openCardInNewPage={ true }/>);

    const link = findRenderedComponentWithType(instance, Link);
    link.props.target.should.eql('_blank');
  });
});
