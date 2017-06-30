import { handleActions } from 'redux-actions';

import { SEARCH_TRACKING_CHANGE_SEARCH_TERM } from 'utils/constants';


export default handleActions({
  [SEARCH_TRACKING_CHANGE_SEARCH_TERM]: (state, { payload }) => payload
}, null);
