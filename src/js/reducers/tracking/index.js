import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import searchTracking from './search-tracking';
import pagination from './pagination';
import sort from './sort';


export default combineReducers({
  isRequesting,
  searchTracking,
  pagination,
  sort
});
