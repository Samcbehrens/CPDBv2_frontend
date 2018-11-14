import 'officer-page.css';

import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { compact, get } from 'lodash';

import { pageWrapperStyle, wrapperStyle } from './officer-page.style';
import AnimatedRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { POPUP_NAMES } from 'utils/constants';
import Printable from 'components/common/higher-order/printable';


class OfficerPage extends Component {
  getChildContext() {
    return {
      isPrinting: this.props.isPrinting,
    };
  }

  render() {
    const {
      officerId,
      officerSummary,
      officerMetrics,
      officerName,
      threeCornerPercentile,
      changeOfficerTab,
      currentTab,
      hasComplaint,
      hasMapMarker,
      hasCoaccusal,
      popup,
      isRequesting,
      triangleEditWrapperStateProps,
      scaleEditWrapperStateProps,
      noDataRadarChartEditWrapperStateProps,
      pathName,
    } = this.props;

    const pageTitle = compact([
      officerSummary.rank === 'N/A' ? '' : officerSummary.rank,
      officerName
    ]).join(' ');

    return (
      <DocumentTitle title={ pageTitle }>
        <div style={ wrapperStyle } className='officer-page'>
          <ShareableHeaderContainer />
          <div style={ pageWrapperStyle }>
            <AnimatedRadarChart
              officerId={ officerId }
              data={ threeCornerPercentile }
              isRequesting={ isRequesting }
              triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
              scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
              noDataRadarChartEditWrapperStateProps={ noDataRadarChartEditWrapperStateProps }
              noDataPopup={ get(popup, POPUP_NAMES.OFFICER.NO_DATA_RADAR_CHART) }
            />
            <SummarySection
              officerName={ officerName }
              officerSummary={ officerSummary }
              popup={ popup }
              pathName={ pathName }
            />
          </div>
          <MetricsSection metrics={ officerMetrics } popup={ popup } pathName={ pathName }/>
          <TabbedPaneSection
            changeOfficerTab={ changeOfficerTab }
            currentTab={ currentTab }
            hasComplaint={ hasComplaint }
            hasMapMarker={ hasMapMarker }
            hasCoaccusal={ hasCoaccusal }
          />
        </div>
      </DocumentTitle>
    );
  }
}

OfficerPage.propTypes = {
  officerId: PropTypes.number,
  officerName: PropTypes.string,
  officerSummary: PropTypes.object,
  officerMetrics: PropTypes.object,
  threeCornerPercentile: PropTypes.array,
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
  hasMapMarker: PropTypes.bool,
  hasCoaccusal: PropTypes.bool,
  isRequesting: PropTypes.bool,
  popup: PropTypes.object,
  triangleEditWrapperStateProps: PropTypes.object,
  scaleEditWrapperStateProps: PropTypes.object,
  noDataRadarChartEditWrapperStateProps: PropTypes.object,
  pathName: PropTypes.string,
  officerSlug: PropTypes.string
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {},
  pathName: '',
};

OfficerPage.childContextTypes = {
  isPrinting: PropTypes.bool,
};

export default Printable(OfficerPage);
