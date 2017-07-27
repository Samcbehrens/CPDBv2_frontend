import filter from 'reducers/tracking/filter';

import { SEARCH_TRACKING_CHANGE_FILTER } from 'utils/constants';


describe('filter reducer', function () {
  it('should have initial state', function () {
    filter(undefined, {}).should.eql([]);
  });

  it('should handle SEARCH_TRACKING_CHANGE_FILTER', function () {
    filter([], {
      type: SEARCH_TRACKING_CHANGE_FILTER,
      payload: 'foo'
    }).should.eql(['foo']);

    filter(['foo', 'bar'], {
      type: SEARCH_TRACKING_CHANGE_FILTER,
      payload: 'foo'
    }).should.eql(['bar']);
  });
});
