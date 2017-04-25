import unmatchable from 'reducers/resolving-page/unmatchable';

import { RESOLVING_MATCHING_SUCCESS } from 'utils/constants';


describe('summary reducer', function () {
  it('should have initial state', function () {
    unmatchable(undefined, {}).should.eql({});
  });

  it('should handle RESOLVING_MATCHING_SUCCESS', function () {
    unmatchable(undefined, {
      type: RESOLVING_MATCHING_SUCCESS,
      payload: { 'a': 'b' }
    }).should.eql({ 'a': 'b' });
  });
});
