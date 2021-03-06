import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

import Header from './header';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import SummaryPageContainer from 'containers/unit-profile-page/summary-page';
import { pageWrapperStyle } from './unit-profile-page.style';


export default class UnitProfilePage extends Component {
  render() {
    const { unitName, summary, scrollPosition } = this.props;

    return (
      <DocumentMeta title={ `Unit ${unitName}` }>
        <div>
          <ShareableHeaderContainer />
          <Header
            unitName={ unitName }
            unitDescription={ summary.description }
            scrollPosition={ scrollPosition }
          />
          <div style={ pageWrapperStyle }>
            <SummaryPageContainer unitName={ unitName } summary={ summary } />;
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

UnitProfilePage.propTypes = {
  unitName: PropTypes.string,
  summary: PropTypes.object,
  scrollPosition: PropTypes.string
};

UnitProfilePage.defaultProps = {
  summary: {}
};
