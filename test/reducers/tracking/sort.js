import sort from 'reducers/tracking/sort';

import { SEARCH_TRACKING_CHANGE_SORT_FIELD } from 'utils/constants';


describe('sort reducer', function () {
  it('should have initial state', function () {
    sort(undefined, {}).should.eql({ sortIndex: 1, sortAscending: false });
  });

  it('should handle SEARCH_TRACKING_CHANGE_SORT_FIELD', function () {
    sort({ sortIndex: 1, sortAscending: false }, {
      type: SEARCH_TRACKING_CHANGE_SORT_FIELD,
      payload: { sortIndex: 1, sortAscending: true }
    }).should.eql({ sortIndex: 1, sortAscending: true });
  });
});
