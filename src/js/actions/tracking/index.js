import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';

import {
  SEARCH_TRACKING_URL, SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE,
  SEARCH_TRACKING_CHANGE_SORT_FIELD
} from 'utils/constants';


export const getSearchTrackingList = (params) => (get(
  SEARCH_TRACKING_URL,
  [SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE]
)(params));

export const changeSearchTrackingSortField = createAction(SEARCH_TRACKING_CHANGE_SORT_FIELD);
