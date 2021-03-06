import { handleActions } from 'redux-actions';

import { OFFICER_SUMMARY_REQUEST_SUCCESS, CHANGE_OFFICER_ID } from 'utils/constants';


export default handleActions({
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => action.payload['full_name'],
  [CHANGE_OFFICER_ID]: () => ''
}, '');
