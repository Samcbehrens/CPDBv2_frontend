import { createSelector } from 'reselect';
import { each, map } from 'lodash';

import extractQuery from 'utils/extract-query';

const getSearchTrackingList = state => state.tracking.searchTracking;
const getSearchTrackingNextUrl = state => state.tracking.pagination.next;

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
