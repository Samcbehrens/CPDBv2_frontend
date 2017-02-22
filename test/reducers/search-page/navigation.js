import navigation from 'reducers/search-page/navigation';
import {
  SEARCH_NAVIGATION_LEFT, SEARCH_NAVIGATION_DOWN, SEARCH_NAVIGATION_RIGHT,
  SEARCH_NAVIGATION_UP
} from 'actions/search-page';


describe('navigation reducer', function () {
  describe('SEARCH_NAVIGATION_LEFT', function () {
    it('shouldn\'t move left if the column index is 0', function () {
      const suggestionColumns = [2, 2];

      navigation([0, 0], {
        type: SEARCH_NAVIGATION_LEFT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([0, 0]);
    });

    it('should move to last item of the column if current item index greater than the column\'s length', function () {
      const suggestionColumns = [2, 3];

      navigation([1, 2], {
        type: SEARCH_NAVIGATION_LEFT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([0, 1]);
    });

    it('should move to left column keeping item index', function () {
      const suggestionColumns = [2, 2];

      navigation([1, 0], {
        type: SEARCH_NAVIGATION_LEFT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([0, 0]);
    });
  });

  describe('SEARCH_NAVIGATION_DOWN', function () {
    it('shouldn\'t move down if it\'s the last one', function () {
      const suggestionColumns = [2];

      navigation([0, 1], {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([0, 1]);
    });

    it('should should move down', function () {
      const suggestionColumns = [2];

      navigation([0, 0], {
        type: SEARCH_NAVIGATION_DOWN,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([0, 1]);
    });
  });

  describe('SEARCH_NAVIGATION_UP', function () {
    it('shouldn\'t move up if it\'s the first one', function () {
      const suggestionColumns = [2];

      navigation([0, 0], {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([0, 0]);
    });

    it('should should move up', function () {
      const suggestionColumns = [2];

      navigation([0, 1], {
        type: SEARCH_NAVIGATION_UP,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([0, 0]);
    });
  });

  describe('SEARCH_NAVIGATION_RIGHT', function () {
    it('shouldn\'t move left if position is at right end', function () {
      const suggestionColumns = [2, 2];

      navigation([1, 0], {
        type: SEARCH_NAVIGATION_RIGHT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([1, 0]);
    });

    it('should move to last item of the column if current item index greater than the column\'s length', function () {
      const suggestionColumns = [3, 2];

      navigation([0, 2], {
        type: SEARCH_NAVIGATION_RIGHT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([1, 1]);
    });

    it('should move to left column keeping item index', function () {
      const suggestionColumns = [2, 2];

      navigation([0, 0], {
        type: SEARCH_NAVIGATION_RIGHT,
        payload: {
          suggestionColumns
        }
      }).should.deepEqual([1, 0]);
    });
  });
});
