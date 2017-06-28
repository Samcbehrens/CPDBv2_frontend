import { handleActions } from 'redux-actions';

import { SEARCH_TRACKING_CHANGE_SORT_FIELD } from 'utils/constants';


export default handleActions({
  [SEARCH_TRACKING_CHANGE_SORT_FIELD]: (state, action) => ({
    sortIndex: action.payload.sortIndex,
    sortAscending: action.payload.sortAscending
  })
}, { sortIndex: 1, sortAscending: false });
