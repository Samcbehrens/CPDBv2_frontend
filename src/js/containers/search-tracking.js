import { connect } from 'react-redux';
import React from 'react';
import { get } from 'lodash';

import { getSearchTrackingList } from 'actions/tracking';
import { searchTrackingListSelector } from 'selectors/tracking';
import SearchTrackingPage from 'components/tracking';


const mapStateToProps = state => {
  const isRequesting = get(state, 'tracking.isRequesting', false);

  return {
    isRequesting,
    trackingList: searchTrackingListSelector(state)
  };
};

const mapDispatchToProps = {
  getSearchTrackingList
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTrackingPage);
