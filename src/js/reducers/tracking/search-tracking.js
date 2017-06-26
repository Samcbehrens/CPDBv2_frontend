import { handleActions } from 'redux-actions';

import { SEARCH_TRACKING_SUCCESS } from 'utils/constants';


export default handleActions({
  [SEARCH_TRACKING_SUCCESS]: (state, action) => (
    { ...state, ...action.payload }
  )
}, {});
