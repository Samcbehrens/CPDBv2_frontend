import { SEARCH_TRACKING_SUCCESS } from 'utils/constants';
import searchTracking from 'reducers/tracking/search-tracking';


describe('searchTracking reducer', function () {
  it('should return initial state', function () {
    searchTracking(undefined, {}).should.eql({});
  });

  it('should handle SEARCH_TRACKING_SUCCESS action', function () {
    searchTracking({}, {
      type: SEARCH_TRACKING_SUCCESS,
      payload: {
        foo: 'bar'
      }
    }).should.eql({
      foo: 'bar'
    });
  });
});
