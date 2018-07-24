import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import { coaccusalGroupsSelector } from 'selectors/officer-page/coaccusals';
import { openOfficerPage } from 'actions/open-page';


function mapStateToProps(state, ownProps) {
  return {
    coaccusalGroups: coaccusalGroupsSelector(state)
  };
}

const mapDispatchToProps = {
  openOfficerPage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coaccusals));
