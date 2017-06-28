import { handleActions } from 'redux-actions';

import { SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_CHANGE_SORT_FIELD } from 'utils/constants';


export default handleActions({
  [SEARCH_TRACKING_SUCCESS]: (state, action) => (
    [...state, ...action.payload.results]
  ),
  [SEARCH_TRACKING_CHANGE_SORT_FIELD]: (state, action) => []
}, []);
