import { stub } from 'sinon';

import {
  isEmptySelector, suggestionTagsSelector, searchResultGroupsSelector,
  hasMoreSelector, nextParamsSelector, isShowingSingleContentTypeSelector,
  firstItemSelector
} from 'selectors/search-page/search-results/suggestion-groups';
import { RawOfficerSuggestion, RawCRSuggestion } from 'utils/test/factories/suggestion';
import * as v1UrlUtils from 'utils/v1-url';


describe('isShowingSingleContentTypeSelector', function () {
  it('should tell if showing single type of content', function () {
    isShowingSingleContentTypeSelector({
      searchPage: {
        contentType: 'OFFICER',
        tags: []
      }
    }).should.be.true();
    isShowingSingleContentTypeSelector({
      searchPage: {
        contentType: null,
        tags: [1]
      }
    }).should.be.true();
    isShowingSingleContentTypeSelector({
      searchPage: {
        tags: []
      },
    }).should.be.false();
  });
});

describe('search page results selector', function () {
  describe('searchResultGroupsSelector', function () {
    it('should give correct item format for OFFICER', function () {
      searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [
              RawOfficerSuggestion.build({ id: '29033' }, {
                race: 'White',
                resultText: 'Jerome Turbyville',
                sex: 'Male',
                birthYear: 1969,
                to: '/officer/29033/',
                allegationCount: 10,
                sustainedCount: 2,
                majorAwardCount: 2,
                honorableMentionCount: 2,
                honorableMentionPercentile: 72.2,
                unit: {
                  id: 1,
                  'unit_name': '018',
                  description: 'a',
                },
              })
            ]
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          canLoadMore: false,
          items: [{
            'appointedDate': 'DEC 13, 1999',
            'badge': '5922',
            'age': 48,
            'civilianComplimentCount': 4,
            'complaintCount': 10,
            'complaintPercentile': 93,
            'disciplineCount': 1,
            'fullName': 'Jerome Turbyville',
            'gender': 'Male',
            'id': '29033',
            'itemIndex': 1,
            'lastPercentile': {
              'items': [
                {
                  'axis': 'Use of Force Reports',
                  'value': 90,
                },
                {
                  'axis': 'Internal Allegations',
                  'value': 91,
                },
                {
                  'axis': 'Civilian Allegations',
                  'value': 92,
                },
              ],
              'officerId': undefined,
              'textColor': '#DFDFDF',
              'visualTokenBackground': '#e81f25',
              'year': undefined,
            },
            'name': 'Jerome Turbyville',
            'race': 'White',
            'rank': 'Police Officer',
            'resignationDate': null,
            'sustainedCount': 2,
            'majorAwardCount': 2,
            'honorableMentionCount': 2,
            'honorableMentionPercentile': 72,
            'tags': [],
            'text': 'Jerome Turbyville',
            'to': '/officer/29033/',
            'trrCount': undefined,
            'trrPercentile': 90,
            'type': 'OFFICER',
            'uniqueKey': 'OFFICER-29033',
            'unit': {
              id: 1,
              unitName: '018',
              description: 'a',
            },
            'url': '',
          }]
        }
      ]);
    });

    it('should give correct item format for CR', function () {
      searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'CR': [RawCRSuggestion.build(
              { id: '1001' },
              { crid: '1234', 'outcome': 'Sustained', resultText: 'Lorem' }
            )]
          }
        }
      }).should.deepEqual([
        {
          header: 'CR',
          canLoadMore: false,
          items: [{
            type: 'CR',
            id: '1001',
            text: 'Lorem',
            to: '',
            url: '',
            tags: [],
            uniqueKey: 'CR-1001',
            subText: 'CRID 1234, Sustained',
            itemIndex: 1,
          }]
        }
      ]);
    });

    it('should limit items per category to 5', function () {
      const [officerGroup, coaccusedGroup] = searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(10),
            'CO-ACCUSED': RawOfficerSuggestion.buildList(3)
          }
        }
      });

      officerGroup.header.should.equal('OFFICER');
      officerGroup.items.should.have.length(5);
      officerGroup.canLoadMore.should.be.true();

      coaccusedGroup.header.should.equal('CO-ACCUSED');
      coaccusedGroup.items.should.have.length(3);
      coaccusedGroup.canLoadMore.should.be.false();
    });

    it('should not limit items if a category is selected', function () {
      const [officerGroup] = searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(10),
            'CO-ACCUSED': RawOfficerSuggestion.buildList(3)
          },
          contentType: 'OFFICER'
        }
      });

      officerGroup.header.should.equal('OFFICER');
      officerGroup.items.should.have.length(10);
      officerGroup.canLoadMore.should.be.false();
    });

    it('should omit empty categories', function () {
      const groups = searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'CO-ACCUSED': RawOfficerSuggestion.buildList(3)
          }
        }
      });

      groups.length.should.equal(1);
      groups[0].header.should.equal('CO-ACCUSED');
    });

    it('should give correct item format for COMMUNITY', function () {
      const groups = searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            COMMUNITY: [
              {
                id: 317,
                text: 'Roseland',
                payload: {
                  name: 'Roseland',
                  'median_income': '$37,084',
                  tags: [],
                  url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Roseland',
                  'most_common_complaint': [{
                    id: 204,
                    name: 'Operation/Personnel Violations',
                    count: 227,
                  }],
                  'officers_most_complaint': [{
                    id: 12478,
                    name: 'Ronald Holt',
                    count: 26,
                    'percentile_trr': 95.0,
                    'percentile_allegation_internal': 82.0,
                    'percentile_allegation_civilian': 97.0
                  }],
                  'race_count': [
                    { race: 'Persons of Spanish Language', count: 121 },
                    { race: 'Black or African-American', count: 131 },
                    { race: 'Other', count: 100 },
                    { race: 'Native American', count: 0 },
                  ],
                  'result_text': 'Roseland',
                  alderman: 'John Wick',
                  'allegation_count': 12,
                  'allegation_percentile': 80.1,
                  commander: {
                    id: 123,
                    'full_name': 'John Watts',
                    'allegation_count': 10,
                  },
                  'police_hq': '22nd',
                },
              }
            ]
          }
        }
      });
      groups.should.eql([{
        header: 'COMMUNITY',
        canLoadMore: false,
        items: [{
          type: 'COMMUNITY',
          id: 317,
          text: 'Roseland',
          to: undefined,
          url: 'https://data.cpdp.co/url-mediator/session-builder?neighborhood=Roseland',
          tags: [],
          uniqueKey: 'COMMUNITY-317',
          itemIndex: 1,
          name: 'Roseland',
          allegationCount: 12,
          allegationPercentile: 80.1,
          mostCommonComplaint: [{
            id: 204,
            name: 'Operation/Personnel Violations',
            count: 227,
          }],
          officersMostComplaint: [{
            id: 12478,
            name: 'Ronald Holt',
            count: 26,
            radarAxes: [{
              axis: 'trr',
              value: 95
            }, {
              axis: 'internal',
              value: 82
            }, {
              axis: 'civilian',
              value: 97
            }],
            radarColor: {
              backgroundColor: '#e81f25',
              textColor: '#DFDFDF'
            },
            url: '/officer/12478/'
          }],
          districtCommander: {
            id: 123,
            name: 'John Watts',
            count: 10,
            url: '/officer/123/',
          },
          population: '352',
          medianIncome: '$37,084',
          alderman: 'John Wick',
          policeHQ: '22nd',
          raceCount: [
            { race: 'Hispanic', count: '34.4%' },
            { race: 'Black', count: '37.2%' },
            { race: 'Other', count: '28.4%' },
            { race: 'Native', count: '0.0%' },
          ],
        }],
      }]);
    });
  });

  describe('suggestionTagsSelector', function () {
    it('should output correct order', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY', 'POLICE-DISTRICT'],
          query: 'something'
        }
      }).should.deepEqual(['OFFICER', 'COMMUNITY', 'NEIGHBORHOOD', 'POLICE-DISTRICT', 'UNIT']);
    });

    it('should output RECENT tag if there is no query', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY'],
          query: ''
        }
      }).should.deepEqual(['RECENT']);
    });
  });

  describe('isEmptySelector', function () {
    it('should be true when all keys are empty', function () {
      isEmptySelector({
        searchPage: {
          tags: [],
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
          tags: [],
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': []
          }
        }
      }).should.be.false();
    });
  });

  describe('hasMoreSelector', function () {
    it('should return false when no content type is selected', function () {
      hasMoreSelector({
        searchPage: {
          tags: [],
          pagination: {},
          contentType: null
        }
      }).should.be.false();
    });

    it('should return false when content type is selected and there is no next url', function () {
      hasMoreSelector({
        searchPage: {
          tags: [],
          pagination: {},
          contentType: 'OFFICER'
        }
      }).should.be.false();
    });

    it('should return true when content type is selected and there is next url', function () {
      hasMoreSelector({
        searchPage: {
          tags: [],
          pagination: {
            next: 'example.com/next'
          },
          contentType: 'OFFICER'
        }
      }).should.be.true();
    });
  });

  describe('nextParamsSelector', function () {
    it('should return params from url', function () {
      nextParamsSelector({
        searchPage: {
          pagination: {
            next: 'example.com?limit=20&offset=20'
          }
        }
      }).should.deepEqual({
        limit: '20',
        offset: '20'
      });
    });
  });

  describe('firstItemSelector', function () {
    it('should return datatool url if there is no suggestion group', function () {
      stub(v1UrlUtils, 'dataToolSearchUrl').returns('/v1/abc/');

      firstItemSelector({
        searchPage: {
          tags: [],
          query: 'abc',
          suggestionGroups: {}
        }
      }).should.deepEqual({
        url: '/v1/abc/'
      });

      v1UrlUtils.dataToolSearchUrl.calledWith('abc').should.be.true();
      v1UrlUtils.dataToolSearchUrl.restore();
    });

    it('should return first item of first suggestion group', function () {
      firstItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [
              RawOfficerSuggestion.build({ id: '1' }, {
                to: 'officer1',
                url: '/officer/1/',
                resultText: 'officer1',
                type: 'OFFICER'
              }),
              ...RawOfficerSuggestion.buildList(2)
            ],
            'CR': [
              RawCRSuggestion.build()
            ]
          }
        }
      }).should.deepEqual({
        to: 'officer1',
        url: '/officer/1/',
        text: 'officer1',
        type: 'OFFICER'
      });
    });
  });
});

