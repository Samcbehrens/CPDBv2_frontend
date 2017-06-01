import { combineReducers } from 'redux';

import unmatchable from './unmatchable';
import unmergeable from './unmergeable';
import dedupeTraining from './dedupe-training';


export default combineReducers({
  unmatchable,
  unmergeable,
  dedupeTraining
});
