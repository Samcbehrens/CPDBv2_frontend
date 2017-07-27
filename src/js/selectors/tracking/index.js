import { createSelector } from 'reselect';
import { each, map, isEmpty, join } from 'lodash';

import extractQuery from 'utils/extract-query';

const getSearchTrackingList = state => state.tracking.searchTracking;
const getSearchTrackingNextUrl = state => state.tracking.pagination.next;
const getSearchTrackingFilter = state => state.tracking.filter;
const getSearchTrackingSearchTerm = state => state.tracking.searchTerm;

const trackingToCamelCase = tracking => {
  const camelMaps = { 'query_type': 'queryType', 'last_entered': 'lastEntered' };
  const obj = {};
  each(tracking, (value, key) => {
    const newKey = camelMaps[key] || key;
    obj[newKey] = value;
  });

  return obj;
};

export const searchTrackingListSelector = createSelector(
  getSearchTrackingList,
  trackingList => (map(trackingList, trackingToCamelCase))
);

export const searchTrackingNextParamsSelector = createSelector(
  getSearchTrackingNextUrl,
  url => extractQuery(url)
);

export const hasMoreSearchTrackingSelector = createSelector(
  getSearchTrackingNextUrl,
  url => url != null
);

export const searchTrackingFilterParams = createSelector(
  getSearchTrackingFilter,
  filter => !isEmpty(filter) ? { 'query_types': join(filter, ',') } : {}
);

export const searchTrackingSearchParams = createSelector(
  getSearchTrackingSearchTerm,
  term => !isEmpty(term) ? { 'search': term } : {}
);
