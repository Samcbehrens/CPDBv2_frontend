import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import style from './trr-page.sass';
import OfficerSection from './officer-section';
import TRRInfoSection from './trr-info-section';
import FooterContainer from 'containers/footer-container';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import Printable from 'components/common/higher-order/printable';
import TRRPrintNotesContainer from 'containers/trr-page/print-notes';


class TRRPage extends Component {
  render() {
    const {
      trrId, officer, trrLocation, trrDetail, trrDocument,
      openRequestTRRDocumentModal, popup, pathName
    } = this.props;
    const { printMode } = this.context;

    return (
      <DocumentMeta title={ `TRR ${trrId}` }>
        <div className={ style.trrPage }>
          <ShareableHeaderContainer/>
          <div className={ `${responsiveContainerStyles.responsiveContainer} trr-content` }>
            <h1 className='trr-title'>TRR { trrId }</h1>
            { printMode ? <div className='trr-category-print'>{ trrDetail.category }</div> : null }
            {
              printMode ? (
                <div className='incident-date-print'>
                  <h3 className='incident-date-title-print'>DATE OF INCIDENT</h3>
                  <div className='incident-date-value-print'>{ trrLocation.incidentDate }</div>
                </div>
              ) : null
            }
            <OfficerSection officer={ officer }/>
            <TRRInfoSection
              trrLocation={ trrLocation }
              trrDetail={ trrDetail }
              trrDocument={ trrDocument }
              openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
              popup={ popup }
              pathName={ pathName }
            />
          </div>
          { printMode ? <div className='notes-wrapper'><TRRPrintNotesContainer/></div> : null }
          <FooterContainer/>
        </div>
      </DocumentMeta>
    );
  }
}

TRRPage.propTypes = {
  trrId: PropTypes.string,
  officer: PropTypes.object,
  trrLocation: PropTypes.object,
  trrDetail: PropTypes.object,
  trrDocument: PropTypes.object,
  openRequestTRRDocumentModal: PropTypes.func,
  popup: PropTypes.object,
  pathName: PropTypes.string,
};

TRRPage.childContextTypes = {
  printMode: PropTypes.bool,
};
export default Printable(TRRPage);
