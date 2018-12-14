import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import should from 'should';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import StaticRadarChart from 'components/common/radar-chart';
import RadarChart from 'components/common/radar-chart/radar-chart';
import RadarArea from 'components/common/radar-chart/radar-area';


describe('StaticRadarChart component', function () {
  let instance;

  afterEach(() => {
    unmountComponentSuppressError(instance);
  });

  it('should be able to render RadarChart', () => {
    const data = [
      {
        axis: 'A',
        value: 10,
      },
      {
        axis: 'B',
        value: 50,
      },
      {
        axis: 'C',
        value: 20,
      }
    ];
    const props = {
      data: data,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps'
    };

    instance = renderIntoDocument(<StaticRadarChart { ...props }/>);

    const radarChart = findRenderedComponentWithType(instance, RadarChart);
    radarChart.props.should.containEql(props);
  });

  it('should render no data radar chart if some data is missing', () => {
    const missingData = [
      {
        axis: 'A',
        value: NaN,
      },
      {
        axis: 'B',
        value: 50,
      },
      {
        axis: 'C',
        value: 20,
      }
    ];
    const props = {
      data: missingData,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps'
    };

    instance = renderIntoDocument(<StaticRadarChart { ...props }/>);

    const noDataRadarChart = findRenderedComponentWithType(instance, RadarChart);
    should(noDataRadarChart.props.data).be.undefined();
    findRenderedComponentWithType(instance, RadarArea);
  });

  it('should render RadarChart with more props in print mode', function () {
    const context = { printMode: true };
    const data = [
      {
        axis: 'A',
        value: 10,
      },
      {
        axis: 'B',
        value: 50,
      },
      {
        axis: 'C',
        value: 20,
      }
    ];
    const props = {
      data: data,
      width: 456,
      height: 432,
      radius: 123,
      someProps: 'someProps'
    };
    instance = renderWithContext(context, <StaticRadarChart { ...props }/>);
    const radarChart = findRenderedComponentWithType(instance, RadarChart);
    radarChart.props.textColor.should.eql('#231F20');
    radarChart.props.backgroundColor.should.eql('#F5F4F4');
    radarChart.props.gridColor.should.eql('#231F20');
    radarChart.props.boundaryAreaColor.should.eql('#F5F4F4');
    radarChart.props.gridOpacity.should.eql(0.5);
    radarChart.props.strokeWidth.should.eql(0);
    radarChart.props.radarMainAreaOpacity.should.eql(0.4);
  });
});
