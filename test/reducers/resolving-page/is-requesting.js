import { RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE } from 'utils/constants';
import isRequesting from 'reducers/resolving-page/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle RESOLVING_MATCHING_START', function () {
    isRequesting(undefined, {
      type: RESOLVING_MATCHING_START
    }).should.be.true();
  });

  it('should handle RESOLVING_MATCHING_SUCCESS', function () {
    isRequesting(undefined, {
      type: RESOLVING_MATCHING_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle RESOLVING_MATCHING_FAILURE', function () {
    isRequesting(undefined, {
      type: RESOLVING_MATCHING_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
