import should from 'should';

import searchTerm from 'reducers/tracking/search-term';

import { SEARCH_TRACKING_CHANGE_SEARCH_TERM } from 'utils/constants';


describe('searchTerm reducer', function () {
  it('should have initial state', function () {
    should.not.exists(searchTerm(undefined, {}));
  });

  it('should handle SEARCH_TRACKING_CHANGE_SEARCH_TERM', function () {
    searchTerm(null, {
      type: SEARCH_TRACKING_CHANGE_SEARCH_TERM,
      payload: 'foo'
    }).should.eql('foo');
  });
});
