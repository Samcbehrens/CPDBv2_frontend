import unmergeable from 'reducers/resolving-page/unmergeable';

import { UNMERGEABLE_SUCCESS } from 'utils/constants';


describe('unmergeableReducer', function () {
  it('should have initial state', function () {
    unmergeable(undefined, {}).should.eql({});
  });

  it('should handle UNMERGEABLE_SUCCESS', function () {
    unmergeable(undefined, {
      type: UNMERGEABLE_SUCCESS,
      payload: { 'a': 'b' }
    }).should.eql({ 'a': 'b' });
  });
});
