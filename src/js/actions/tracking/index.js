import { get } from 'actions/common/async-action';

import {
  SEARCH_TRACKING_URL, SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE
} from 'utils/constants';


export const getSearchTrackingList = (params) => (get(
  SEARCH_TRACKING_URL,
  [SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE]
)(params));
