import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import ComplaintSummaries from './complaint-summaries';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';


class LandingPage extends Component {
  componentDidMount() {
    this.props.resetBreadcrumbs({
      breadcrumbs: []
    });
  }

  renderWithResponsiveStyle(style) {
    return (
      <div>
        <HeatMap/>
        <OfficersByAllegationContainer/>
        <RecentActivityContainer/>
        <RecentDocumentContainer/>

        { /* TODO: will embed reading data when complaint summary is ready*/ }
        <ComplaintSummaries cards={ ComplaintSummaryFactory.buildList(20) }/>
        <FooterContainer/>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {} }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

LandingPage.propTypes = {
  resetBreadcrumbs: PropTypes.func
};

export default ConfiguredRadium(LandingPage);

