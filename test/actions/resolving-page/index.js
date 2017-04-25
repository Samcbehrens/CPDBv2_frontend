import { fetchUnmatchable, matchingAPI } from 'actions/resolving-page';

import {
  RESOLVING_MATCHING_URL,
  RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE,
  MATCHING_API_START, MATCHING_API_SUCCESS, MATCHING_API_FAILURE
} from 'utils/constants';


describe('resolvingPage actions', function () {
  describe('fetchUnmatchable', function () {
    it('should return the right action', function () {
      const url = 'https://foo.bar';
      fetchUnmatchable(url).should.eql({
        types: [RESOLVING_MATCHING_START, RESOLVING_MATCHING_SUCCESS, RESOLVING_MATCHING_FAILURE],
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
            method: 'patch',
            adapter: null
          }
        }
      });
    });
  });
});
