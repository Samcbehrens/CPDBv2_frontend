import pagination from 'reducers/tracking/pagination';

import {
  SEARCH_TRACKING_SUCCESS, SEARCH_TRACKING_FAILURE, SEARCH_TRACKING_CHANGE_SORT_FIELD
} from 'utils/constants';


describe('pagination reducer', function () {
  it('should have initial state', function () {
    pagination(undefined, {}).should.eql({ 'next': null, 'previous': null });
  });

  it('should handle SEARCH_TRACKING_SUCCESS', function () {
    pagination({ 'next': null, 'previous': null }, {
      type: SEARCH_TRACKING_SUCCESS,
      payload: { 'next': 'next', 'previous': 'prev' }
    }).should.eql({ 'next': 'next', 'previous': 'prev' });
  });

  it('should handle SEARCH_TRACKING_FAILURE', function () {
    pagination({ 'next': 'next', 'previous': 'prev' }, {
      type: SEARCH_TRACKING_FAILURE
    }).should.eql({ 'next': null, 'previous': null });
  });

  it('should handle SEARCH_TRACKING_CHANGE_SORT_FIELD', function () {
    pagination({ 'next': 'next', 'previous': 'prev' }, {
      type: SEARCH_TRACKING_CHANGE_SORT_FIELD
    }).should.eql({ 'next': null, 'previous': null });
  });
});
