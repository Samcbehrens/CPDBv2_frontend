import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import unmatchable from './unmatchable';


export default combineReducers({
  unmatchable,
  isRequesting
});
