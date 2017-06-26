import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import searchTracking from './search-tracking';


export default combineReducers({
  isRequesting,
  searchTracking
});
