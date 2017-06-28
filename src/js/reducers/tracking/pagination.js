import { handleActions } from 'redux-actions';

import { SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE, SEARCH_TRACKING_CHANGE_SORT_FIELD } from 'utils/constants';


export default handleActions({
  [SEARCH_TRACKING_SUCCESS]: (state, { payload }) => ({
    next: payload.next,
    previous: payload.previous
  }),
  [SEARCH_TRACKING_FAILURE]: (state, action) => ({
    next: null,
    previous: null
  }),
  [SEARCH_TRACKING_CHANGE_SORT_FIELD]: (state, action) => ({
    next: null,
    previous: null
  })
}, { next: null, previous: null });
