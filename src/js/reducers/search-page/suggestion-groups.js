import { handleActions } from 'redux-actions';
import { unionBy, omitBy, isEmpty } from 'lodash';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.SUGGESTION_REQUEST_START]: (state, action) => ({ meta: {} }),
  [constants.SUGGESTION_REQUEST_SUCCESS]: (state, action) => ({
    ...omitBy(action.payload, isEmpty), meta: { url: action.request.url }
  }),
  [constants.SUGGESTION_REQUEST_FAILURE]: (state, action) => state,
  [constants.SUGGESTION_SINGLE_REQUEST_START]: (state, action) => state,
  [constants.SUGGESTION_SINGLE_REQUEST_SUCCESS]: (state, action) => {
    const { contentType } = action.request.params;
    return {
      [contentType]: action.request.url === state.meta.url ?
        unionBy(state[contentType], action.payload.results, 'id') :
        action.payload.results,
      meta: { url: action.request.url }
    };
  },
  [constants.SUGGESTION_SINGLE_REQUEST_FAILURE]: (state, action) => state
}, { meta: {} });
