import { range } from 'lodash';

import {
  suggestionColumnsSelector, suggestionGroupsSelector, isEmptySelector,
  suggestionTagsSelector, orderedSuggestionGroupsSelector, chunkedSuggestionGroupsSelector,
  focusedSuggestionSelector, previewPaneInfoSelector
} from 'selectors/search-page';

describe('autocomplete selector', function () {
  describe('suggestionGroupsSelector', function () {
    it('should output non-empty group', function () {
      suggestionGroupsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': []
          }
        }
      }).should.deepEqual({
        'OFFICER': [{}]
      });
    });
  });

  describe('suggestionTagsSelector', function () {
    it('should out put correct order', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY']
        }
      }).should.deepEqual(['OFFICER', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT']);
    });
  });

  describe('isEmptySelector', function () {
    it('should be true when all keys are empty', function () {
      isEmptySelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': []
          }
        }
      }).should.be.true();
    });

    it('should be false when not all keys are empty', function () {
      isEmptySelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': []
          }
        }
      }).should.be.false();
    });
  });

  describe('suggestionColumnsSelector', function () {
    it('should chunk columns', function () {
      suggestionColumnsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': range(15)
          },
          itemsPerColumn: 10
        }
      }).should.deepEqual([10]);
    });
  });

  describe('orderedSuggestionGroupsSelector', function () {
    it('should transform suggestionGroups into a structure with guaranteed order', function () {
      orderedSuggestionGroupsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': [],
            'COMMUNITY': [{}, {}]
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          items: [{}]
        },
        {
          header: 'COMMUNITY',
          items: [{}, {}]
        }
      ]);
    });
  });

  describe('chunkedSuggestionGroupsSelector', function () {
    it('should return chunked columns of a single group correctly', function () {
      chunkedSuggestionGroupsSelector({
        searchPage: {
          contentType: 'OFFICER',
          itemsPerColumn: 3,
          suggestionGroups: {
            'OFFICER': ['o1', 'o2', 'o3', 'o4'],
            'UNIT': [],
            'COMMUNITY': ['c1', 'c2']
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          columns: [
            ['o1', 'o2', 'o3'],
            ['o4']
          ],
          canLoadMore: false
        }
      ]);
    });

    it('should return sliced results from all groups correctly', function () {
      chunkedSuggestionGroupsSelector({
        searchPage: {
          itemsPerColumn: 3,
          suggestionGroups: {
            'OFFICER': ['o1', 'o2', 'o3', 'o4'],
            'UNIT': [],
            'COMMUNITY': ['c1', 'c2']
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          columns: [
            ['o1', 'o2', 'o3']
          ],
          canLoadMore: true
        },
        {
          header: 'COMMUNITY',
          columns: [
            ['c1', 'c2']
          ],
          canLoadMore: false
        }
      ]);
    });
  });

  describe('focusedSuggestionSelector', function () {
    it('should return correct suggestion when viewing all groups', function () {
      focusedSuggestionSelector({
        searchPage: {
          itemsPerColumn: 3,
          suggestionGroups: {
            'OFFICER': [{ o1: 'o1' }, { o2: 'o2' }, { o3: 'o3' }, { o4: 'o4' }],
            'UNIT': [],
            'COMMUNITY': [{ c1: 'c1' }, { c2: 'c2' }]
          },
          navigation: {
            columnIndex: 1,
            itemIndex: 1
          }
        }
      }).should.deepEqual({ header: 'COMMUNITY', c2: 'c2' });
    });

    it('should return correct suggestion when viewing single group', function () {
      focusedSuggestionSelector({
        searchPage: {
          itemsPerColumn: 2,
          suggestionGroups: {
            'OFFICER': [{ o1: 'o1' }, { o2: 'o2' }, { o3: 'o3' }, { o4: 'o4' }, { o5: 'o5' }],
            'UNIT': [],
            'COMMUNITY': []
          },
          contentType: 'OFFICER',
          navigation: {
            columnIndex: 2,
            itemIndex: 0
          }
        }
      }).should.deepEqual({ header: 'OFFICER', o5: 'o5' });
    });
  });

  describe('previewPaneInfoSelector', function () {
    it('should return correct info', function () {
      const focusedSuggestion = {
        header: 'OFFICER',
        id: '12345',
        text: 'John Wang',
        payload: {
          unit: '001',
          rank: null,
          salary: '$99,999',
          race: 'White',
          sex: 'Male',
          'visual_token_background_color': '#fafafa'
        }
      };
      const currentYear = (new Date()).getFullYear();
      const info = {
        data: [
          ['unit', '001'],
          ['rank', null],
          [`${currentYear} salary`, '$99,999'],
          ['race', 'White'],
          ['sex', 'Male']
        ],
        visualTokenBackgroundColor: '#fafafa',
        id: '12345',
        text: 'John Wang'
      };
      previewPaneInfoSelector(focusedSuggestion).should.deepEqual(info);
    });
  });
});
