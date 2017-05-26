import { handleActions } from 'redux-actions';

import { UNMERGEABLE_SUCCESS } from 'utils/constants';


export default handleActions({
  [UNMERGEABLE_SUCCESS]: (state, action) => (
    { ...state, ...action.payload }
  )
}, {});
