import { connect } from 'react-redux';
import React from 'react';

import {
  getSearchTrackingList, changeSearchTrackingSortField, changeSearchTrackingFilter,
  changeSearchTrackingSearchTerm
} from 'actions/tracking';
import {
 searchTrackingListSelector, searchTrackingNextParamsSelector, hasMoreSearchTrackingSelector,
 searchTrackingFilterParams, searchTrackingSearchParams
} from 'selectors/tracking';
import SearchTrackingPage from 'components/tracking';


const mapStateToProps = state => {
  const { isRequesting, sort, filter } = state.tracking;

  return {
    isRequesting,
    sort,
    filter,
    trackingList: searchTrackingListSelector(state),
    nextParams: searchTrackingNextParamsSelector(state),
    hasMore: hasMoreSearchTrackingSelector(state),
    filterParams: searchTrackingFilterParams(state),
    searchParams: searchTrackingSearchParams(state)
  };
};

const mapDispatchToProps = {
  getSearchTrackingList,
  changeSortField: changeSearchTrackingSortField,
  changeFilter: changeSearchTrackingFilter,
  changeSearchTerm: changeSearchTrackingSearchTerm
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTrackingPage);
