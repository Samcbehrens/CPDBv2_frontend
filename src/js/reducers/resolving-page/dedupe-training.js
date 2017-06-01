import { handleActions } from 'redux-actions';

import { FETCH_TRAINING_DATA_SUCCESS } from 'utils/constants';


export default handleActions({
  [FETCH_TRAINING_DATA_SUCCESS]: (state, action) => (
    { ...state, ...action.payload }
  )
}, {});
