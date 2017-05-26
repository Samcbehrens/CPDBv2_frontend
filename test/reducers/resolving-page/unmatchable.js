import unmatchable from 'reducers/resolving-page/unmatchable';

import { UNMATCHABLE_SUCCESS } from 'utils/constants';


describe('unmatchableReducer', function () {
  it('should have initial state', function () {
    unmatchable(undefined, {}).should.eql({});
  });

  it('should handle UNMATCHABLE_SUCCESS', function () {
    unmatchable(undefined, {
      type: UNMATCHABLE_SUCCESS,
      payload: { 'a': 'b' }
    }).should.eql({ 'a': 'b' });
  });
});
