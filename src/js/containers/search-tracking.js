import { connect } from 'react-redux';
import React from 'react';

import { getSearchTrackingList, changeSearchTrackingSortField } from 'actions/tracking';
import {
 searchTrackingListSelector, searchTrackingNextParamsSelector, hasMoreSearchTrackingSelector
} from 'selectors/tracking';
import SearchTrackingPage from 'components/tracking';


const mapStateToProps = state => {
  const { isRequesting, sort } = state.tracking;

  return {
    isRequesting,
    sort,
    trackingList: searchTrackingListSelector(state),
    nextParams: searchTrackingNextParamsSelector(state),
    hasMore: hasMoreSearchTrackingSelector(state)
  };
};

const mapDispatchToProps = {
  getSearchTrackingList,
  changeSortField: changeSearchTrackingSortField
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTrackingPage);
