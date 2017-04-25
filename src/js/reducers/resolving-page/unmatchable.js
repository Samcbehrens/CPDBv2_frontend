import { handleActions } from 'redux-actions';

import { RESOLVING_MATCHING_SUCCESS } from 'utils/constants';


export default handleActions({
  [RESOLVING_MATCHING_SUCCESS]: (state, action) => (
    { ...state, ...action.payload }
  )
}, {});
