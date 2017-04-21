import { handleActions } from 'redux-actions';

import { RESOLVING_MATCHING_START } from 'utils/constants';


export default handleActions({
  [RESOLVING_MATCHING_START]: (state, action) => (
    { ...state, ...action.payload }
  )
}, {});
