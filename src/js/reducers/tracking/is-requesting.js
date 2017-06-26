import { handleActions } from 'redux-actions';

import {
  SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE
} from 'utils/constants';


const isRequesting = handleActions({
  [SEARCH_TRACKING_START]: (state, action) => true,
  [SEARCH_TRACKING_SUCCESS]: (state, action) => false,
  [SEARCH_TRACKING_FAILURE]: (state, action) => false
}, false);

export default isRequesting;
