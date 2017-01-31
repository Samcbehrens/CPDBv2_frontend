import {
  getSuggestion, selectTag, toggleSearchMode, suggestionClick,
  SUGGESTION_URL, SELECT_TAG, SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS,
  SUGGESTION_REQUEST_FAILURE, SUGGESTION_CLICK
} from 'actions/search-page';
import { SEARCH_PATH } from 'utils/constants';
import { CALL_HISTORY_METHOD } from 'react-router-redux';


describe('suggestion action', function () {
  describe('getSuggestion', function () {
    it('should return correct action', function () {
      getSuggestion('abc', {
        contentType: 'xyz'
      }).should.deepEqual({
        types: [SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${SUGGESTION_URL}abc/`,
            params: {
              contentType: 'xyz'
            },
            adapter: null
          }
        }
      });
    });
  });

  describe('selectTag', function () {
    it('should return correct action', function () {
      selectTag('abc').should.deepEqual({
        type: SELECT_TAG,
        payload: 'abc'
      });
    });
  });

  describe('toggleSearchMode', function () {
    it('should return correct action', function () {
      toggleSearchMode('abc').should.deepEqual({
        type: CALL_HISTORY_METHOD,
        payload: {
          args: [
            {
              pathname: `/${SEARCH_PATH}`
            }
          ],
          method: 'push'
        }
      });
    });
  });

  describe('suggestionClick', function () {
    it('should return correct action', function () {
      const contentType = 'contentType';
      const text = 'text';
      const url = 'url';

      suggestionClick(contentType, text, url).should.deepEqual({
        type: SUGGESTION_CLICK,
        payload: {
          contentType,
          text,
          url
        }
      });
    });
  });
});