import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { newTimelineItemsSelector, filterCount } from 'selectors/officer-page/new-timeline';
import { changeFilter } from 'actions/officer-page/new-timeline';
import { getOfficerId } from 'selectors/officer-page';
import { changeOfficerTab } from 'actions/officer-page';
import { popupSelector } from 'selectors/popup';
import { getPathname } from 'selectors/common/pathname';

function mapStateToProps(state, ownProps) {
  return {
    items: newTimelineItemsSelector(state),
    officerId: getOfficerId(state),
    popup: popupSelector(state),
    filterCount: filterCount(state),
    pathname: getPathname(state),
  };
}

const mapDispatchToProps = {
  changeFilter,
  changeOfficerTab,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
