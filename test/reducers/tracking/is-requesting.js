import { SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE } from 'utils/constants';
import isRequesting from 'reducers/tracking/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle SEARCH_TRACKING_START', function () {
    isRequesting(undefined, {
      type: SEARCH_TRACKING_START
    }).should.be.true();
  });

  it('should handle SEARCH_TRACKING_SUCCESS', function () {
    isRequesting(true, {
      type: SEARCH_TRACKING_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle SEARCH_TRACKING_FAILURE', function () {
    isRequesting(true, {
      type: SEARCH_TRACKING_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
