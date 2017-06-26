import { getSearchTrackingList } from 'actions/tracking';

import {
  SEARCH_TRACKING_URL, SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE
} from 'utils/constants';


describe('search tracking actions', function () {
  describe('getSearchTrackingList', function () {
    it('should return the right action', function () {
      const params = { sort: 'asc', 'sort_field': 'query' };
      getSearchTrackingList(params).should.eql({
        types: [SEARCH_TRACKING_START, SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE],
        payload: {
          request: {
            url: SEARCH_TRACKING_URL,
            params: params,
            adapter: null
          }
        }
      });
    });
  });
});
