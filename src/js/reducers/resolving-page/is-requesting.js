import { handleActions } from 'redux-actions';

import {
  RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE
} from 'utils/constants';


const isRequesting = handleActions({
  [RESOLVING_MATCHING_START]: (state, action) => true,
  [RESOLVING_MATCHING_SUCCESS]: (state, action) => false,
  [RESOLVING_MATCHING_FAILURE]: (state, action) => false
}, false);

export default isRequesting;
