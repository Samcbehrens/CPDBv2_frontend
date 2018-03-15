import React, { Component, PropTypes } from 'react';

import Header from './header';
import SummaryPageContainer from 'containers/unit-profile-page/summary-page';
import { pageWrapperStyle } from './unit-profile-page.style';
import { scrollToTop } from 'utils/dom';


export default class UnitProfilePage extends Component {
  componentDidMount() {
    const { fetchUnitProfileSummary, unitName } = this.props;
    fetchUnitProfileSummary(unitName);
    scrollToTop();
  }

  render() {
    const { location, unitName, summary, scrollPosition } = this.props;
    const { pathname } = location;

    return (
      <div>
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
    );
  }
}

UnitProfilePage.propTypes = {
  location: PropTypes.object,
  unitName: PropTypes.string,
  summary: PropTypes.object,
  fetchUnitProfileSummary: PropTypes.func,
  scrollPosition: PropTypes.string
};

UnitProfilePage.defaultProps = {
  location: { pathname: '/' },
  summary: {},
  fetchUnitProfileSummary: () => {}
};
