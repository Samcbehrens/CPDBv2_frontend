import {
  deleteUnmergeable, fetchUnmatchable, matchingAPI, fetchUnmergeable, fetchTrainingData,
  train
} from 'actions/resolving-page';

import {
  RESOLVING_MATCHING_URL, TRAINING_DATA_URL,
  UNMATCHABLE_START, UNMATCHABLE_SUCCESS, UNMATCHABLE_FAILURE,
  MATCHING_API_START, MATCHING_API_SUCCESS, MATCHING_API_FAILURE,
  UNMERGEABLE_URL, UNMERGEABLE_DELETE_START, UNMERGEABLE_DELETE_SUCCESS, UNMERGEABLE_DELETE_FAILURE,
  UNMERGEABLE_START, UNMERGEABLE_SUCCESS, UNMERGEABLE_FAILURE,
  FETCH_TRAINING_DATA_START, FETCH_TRAINING_DATA_SUCCESS, FETCH_TRAINING_DATA_FAILURE,
  TRAINING_DATA_START, TRAINING_DATA_SUCCESS, TRAINING_DATA_FAILURE
} from 'utils/constants';


describe('resolvingPage actions', function () {
  describe('fetchUnmatchable', function () {
    it('should return the right action', function () {
      const url = 'https://foo.bar';
      fetchUnmatchable(url).should.eql({
        types: [UNMATCHABLE_START, UNMATCHABLE_SUCCESS, UNMATCHABLE_FAILURE],
        payload: {
          request: {
            url: url,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('matchingAPI', function () {
    it('should return the right action', function () {
      matchingAPI(1, 1).should.eql({
        types: [MATCHING_API_START, MATCHING_API_SUCCESS, MATCHING_API_FAILURE],
        payload: {
          request: {
            url: `${RESOLVING_MATCHING_URL}1/`,
            data: { 'candidate_pk': 1 },
            method: 'put',
            adapter: null
          }
        }
      });
    });
  });

  describe('deleteUnmergeable', function () {
    it('should return the right action', function () {
      deleteUnmergeable(1, 1).should.eql({
        types: [UNMERGEABLE_DELETE_START, UNMERGEABLE_DELETE_SUCCESS, UNMERGEABLE_DELETE_FAILURE],
        payload: {
          request: {
            url: `${UNMERGEABLE_URL}1/`,
            data: { 'record': 1 },
            method: 'delete',
            adapter: null
          }
        }
      });
    });
  });

  describe('fetchUnmergeable', function () {
    it('should return the right action', function () {
      const url = 'https://foo.bar';
      fetchUnmergeable(url).should.eql({
        types: [UNMERGEABLE_START, UNMERGEABLE_SUCCESS, UNMERGEABLE_FAILURE],
        payload: {
          request: {
            url: url,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('fetchTrainingData', function () {
    it('should return the right action', function () {
      fetchTrainingData().should.eql({
        types: [FETCH_TRAINING_DATA_START, FETCH_TRAINING_DATA_SUCCESS, FETCH_TRAINING_DATA_FAILURE],
        payload: {
          request: {
            url: TRAINING_DATA_URL,
            params: undefined,
            adapter: null
          }
        }
      });
    });
  });

  describe('train', function () {
    it('should return the right action', function () {
      train().should.eql({
        types: [TRAINING_DATA_START, TRAINING_DATA_SUCCESS, TRAINING_DATA_FAILURE],
        payload: {
          request: {
            url: TRAINING_DATA_URL,
            method: 'post',
            data: {
              'action': undefined,
              'other': undefined,
              'this': undefined
            },
            adapter: null
          }
        }
      });
    });
  });
});
