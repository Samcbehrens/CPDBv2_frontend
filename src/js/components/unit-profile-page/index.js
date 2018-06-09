import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Header from './header';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import SummaryPageContainer from 'containers/unit-profile-page/summary-page';
import { pageWrapperStyle } from './unit-profile-page.style';


export default class UnitProfilePage extends Component {
  render() {
    const { location, unitName, summary, scrollPosition } = this.props;
    const { pathname } = location;

    return (
      <DocumentTitle title={ `${unitName} ${summary.description}` }>
        <div>
          <ShareableHeaderContainer/>
          <Header
            unitName={ unitName }
            pathname={ pathname }
            unitDescription={ summary.description }
            scrollPosition={ scrollPosition }
          />
          <div style={ pageWrapperStyle }>
            <SummaryPageContainer unitName={ unitName } summary={ summary }/>;
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

UnitProfilePage.propTypes = {
  location: PropTypes.object,
  unitName: PropTypes.string,
  summary: PropTypes.object,
  scrollPosition: PropTypes.string
};

UnitProfilePage.defaultProps = {
  location: { pathname: '/' },
  summary: {}
};
