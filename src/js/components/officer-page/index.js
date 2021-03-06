import 'officer-page.css';

import React, { Component, PropTypes } from 'react';
import { compact, get } from 'lodash';
import DocumentMeta from 'react-document-meta';
import pluralize from 'pluralize';

import AnimatedRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { POPUP_NAMES } from 'utils/constants';
import styles from './officer-page.sass';
import Printable from 'components/common/higher-order/printable';
import PrintNotes from 'components/common/print-notes';
import PrintPreloadFonts from 'components/common/print-preload-fonts';
import DownloadMenuContainer from 'containers/headers/shareable-header/download-menu-container';


class OfficerPage extends Component {
  render() {
    const {
      officerId,
      officerSummary,
      officerMetrics,
      numAttachments,
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
      infoNotes,
      timelineNotes,
    } = this.props;
    const { printMode } = this.context;

    const pageTitle = compact([
      officerSummary.rank === 'N/A' ? '' : officerSummary.rank,
      officerName
    ]).join(' ');

    const hasUnknownBadge = (officerSummary.badge || 'Unknown') === 'Unknown';
    const withBadge = officerSummary.hasUniqueName || hasUnknownBadge ?
      '' :
      `with Badge Number ${officerSummary.badge} `;

    const pageDescription = `Officer ${officerName} of the Chicago Police Department ` +
       withBadge +
      `has ${pluralize('complaint', officerMetrics.allegationCount, true)}, ` +
      `${pluralize('use of force report', officerMetrics.useOfForceCount, true)}, ` +
      `and ${pluralize('original document', numAttachments, true)} available.`;

    return (
      <DocumentMeta title={ pageTitle } description={ pageDescription }>
        <div className={ styles.officerPage }>
          <ShareableHeaderContainer Menu={ DownloadMenuContainer } buttonText='Download' />
          <div className='page-wrapper'>
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
          { printMode ? <PrintNotes notes={ infoNotes } /> : null }
          <TabbedPaneSection
            changeOfficerTab={ changeOfficerTab }
            currentTab={ currentTab }
            hasComplaint={ hasComplaint }
            hasMapMarker={ hasMapMarker }
            hasCoaccusal={ hasCoaccusal }
          />
          { printMode ? <PrintNotes notes={ timelineNotes } /> : null }
          <PrintPreloadFonts/>
        </div>
      </DocumentMeta>
    );
  }
}

OfficerPage.propTypes = {
  officerId: PropTypes.number,
  officerName: PropTypes.string,
  officerSummary: PropTypes.object,
  officerMetrics: PropTypes.object,
  numAttachments: PropTypes.number,
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
  officerSlug: PropTypes.string,
  infoNotes: PropTypes.array,
  timelineNotes: PropTypes.array,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {},
  pathName: '',
  officerMetrics: {
    allegationCount: 0,
    useOfForceCount: 0,
  },
  numAttachments: 0,
};

OfficerPage.contextTypes = {
  printMode: PropTypes.bool,
};

export default Printable(OfficerPage);
