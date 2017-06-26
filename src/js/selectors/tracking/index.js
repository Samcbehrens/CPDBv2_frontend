import { createSelector } from 'reselect';
import { get, each, map } from 'lodash';


const getSearchTrackingList = state => get(state, 'tracking.searchTracking.results', []);

export const searchTrackingListSelector = createSelector(
  getSearchTrackingList,
  trackingList => (map(trackingList, trackingToCamelCase))
);

const trackingToCamelCase = tracking => {
  const camelMaps = { 'query_type': 'queryType', 'last_entered': 'lastEntered' };
  const obj = {};
  each(tracking, (value, key) => {
    const newKey = camelMaps[key] || key;
    obj[newKey] = value;
  });

  return obj;
};
