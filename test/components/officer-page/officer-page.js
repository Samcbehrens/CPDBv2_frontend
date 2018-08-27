import React from 'react';
import { findRenderedComponentWithType, renderIntoDocument, } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import OfficerPage from 'components/officer-page';
import SummarySection from 'components/officer-page/summary-section';
import MetricsSection from 'components/officer-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import { OFFICER_EDIT_TYPES } from 'utils/constants';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {},
      metrics: {},
      newTimeline: {},
      editModeOn: {
        [OFFICER_EDIT_TYPES.TRIANGLE]: false,
        [OFFICER_EDIT_TYPES.SCALE]: false,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
      }
    },
    breadcrumb: {
      breadcrumbs: []
    },
    popups: [],
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough sections', function () {
    const triangleEditWrapperStateProps = spy();
    const scaleEditWrapperStateProps = spy();
    const noDataRadarChartEditWrapperStateProps = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage
          officerId={ 1 }
          triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
          scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
          noDataRadarChartEditWrapperStateProps={ noDataRadarChartEditWrapperStateProps }
        />
      </Provider>
    );

    findRenderedComponentWithType(instance, SummarySection);
    findRenderedComponentWithType(instance, MetricsSection);
    findRenderedComponentWithType(instance, TabbedPaneSection);
    const officerRadarChart = findRenderedComponentWithType(instance, OfficerRadarChart);
    officerRadarChart.props.triangleEditWrapperStateProps.should.eql(triangleEditWrapperStateProps);
    officerRadarChart.props.scaleEditWrapperStateProps.should.eql(scaleEditWrapperStateProps);
    officerRadarChart.props.noDataRadarChartEditWrapperStateProps.should.eql(noDataRadarChartEditWrapperStateProps);
  });

  it('should render correct document title', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage
          officerName='Shaun Frank'
          officerSummary={ { rank: 'Officer' } }
        />
      </Provider>
    );

    let documentTitle = findRenderedComponentWithType(instance, DocumentTitle);
    documentTitle.props.title.should.eql('Officer Shaun Frank');

    instance = reRender(
      <Provider store={ store }>
        <OfficerPage officerName='Jerome Finigan' officerSummary={ { rank: 'N/A' } }/>
      </Provider>,
      instance
    );

    documentTitle = findRenderedComponentWithType(instance, DocumentTitle);
    documentTitle.props.title.should.eql('Jerome Finigan');
  });
});
