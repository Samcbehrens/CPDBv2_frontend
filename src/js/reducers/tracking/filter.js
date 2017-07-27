import { without } from 'lodash';
import { handleActions } from 'redux-actions';

import { SEARCH_TRACKING_CHANGE_FILTER } from 'utils/constants';


export default handleActions({
  [SEARCH_TRACKING_CHANGE_FILTER]: (state, { payload }) => {
    if (state.indexOf(payload) != -1) {
      return without(state, payload);
    }
    return [...state, payload];
  }
}, []);
