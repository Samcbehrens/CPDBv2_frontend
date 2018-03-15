import React, { Component, PropTypes } from 'react';

import { pageWrapperStyle } from './officer-page.style';
import Header from './header';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import TimelinePage from './timeline-page';
import SocialGraphPageContainer from 'containers/officer-page/social-graph-page';
import { scrollToTop } from 'utils/dom';


export default class OfficerPage extends Component {

  componentDidMount() {
    scrollToTop();
  }

  renderChildren() {
    const { activeTab, query } = this.props;
    if (activeTab === 'timeline') {
      return <TimelinePage urlParams={ query }/>;
    } else if (activeTab === 'social') {
      return <SocialGraphPageContainer/>;
    }
    return <SummaryPageContainer/>;
  }

  render() {
    const { officerName, activeTab, pathname, officerTimelineUrlParams, scrollPosition } = this.props;

    return (
      <div>
        <Header
          officerName={ officerName }
          activeTab={ activeTab }
          pathname={ pathname }
          officerTimelineUrlParams={ officerTimelineUrlParams }
          scrollPosition={ scrollPosition }
        />
        <div style={ pageWrapperStyle }>
          { this.renderChildren() }
        </div>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  officerName: PropTypes.string,
  officerTimelineUrlParams: PropTypes.string,
  activeTab: PropTypes.string,
  pathname: PropTypes.string,
  query: PropTypes.object,
  scrollPosition: PropTypes.string,
};

OfficerPage.defaultProps = {
  pathname: '/',
  scrollPosition: 'top',
};
