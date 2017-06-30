import {
  searchTrackingListSelector, searchTrackingNextParamsSelector, hasMoreSearchTrackingSelector,
  searchTrackingFilterParams, searchTrackingSearchParams
} from 'selectors/tracking';


describe('search tracking selectors', function () {
  const state = {
    tracking: {}
  };

  it('should return tracking list', function () {
    state.tracking.searchTracking = [{
      'query_type': 'foo'
    }, {
      'last_entered': 'bar'
    }];

    searchTrackingListSelector(state).should.eql([{
      queryType: 'foo'
    }, {
      lastEntered: 'bar'
    }]);
  });

  it('should return search tracking next params', function () {
    state.tracking.pagination = {
      next: 'http://foo.com/?a=b&c=d'
    };

    searchTrackingNextParamsSelector(state).should.eql({
      a: 'b',
      c: 'd'
    });
  });

  it('should return has more search tracking', function () {
    state.tracking.pagination = {
      next: 'http://foo.com'
    };
    hasMoreSearchTrackingSelector(state).should.be.true();

    state.tracking.pagination = {
      next: null
    };
    hasMoreSearchTrackingSelector(state).should.be.false();
  });

  it('should return search tracking filter params', function () {
    state.tracking.filter = [];
    searchTrackingFilterParams(state).should.eql({});

    state.tracking.filter = ['foo', 'bar'];
    searchTrackingFilterParams(state).should.eql({ 'query_types': 'foo,bar' });
  });

  it('should return search tracking search params', function () {
    state.tracking.searchTerm = '';
    searchTrackingSearchParams(state).should.eql({});

    state.tracking.searchTerm = 'foo';
    searchTrackingSearchParams(state).should.eql({ 'search': 'foo' });
  });
});
