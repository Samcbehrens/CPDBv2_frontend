import { handleActions } from 'redux-actions';

import { UNMATCHABLE_SUCCESS } from 'utils/constants';


export default handleActions({
  [UNMATCHABLE_SUCCESS]: (state, action) => (
    { ...state, ...action.payload }
  )
}, {});
