import { RawOfficerSuggestion, RawNeighborhoodSuggestion } from 'utils/test/factories/suggestion';


export const groupedSuggestions = {
  'default': {
    'OFFICER': [
      RawOfficerSuggestion.build(
        {
          id: '1'
        }, {
          resultText: 'Bernadette Kelly',
          to: '/officer/1/',
          allegationCount: 10,
          sustainedCount: 2,
          birthYear: 1972,
          race: 'White',
          gender: 'Male'
        }
      ),
      RawOfficerSuggestion.build(
        {
          id: '2'
        }, {
          resultText: 'Anna Kelly',
          to: '/officer/2/',
          allegationCount: 5,
          sustainedCount: 1,
          birthYear: 1980,
          race: 'White',
          gender: 'Female'
        }),
      ...RawOfficerSuggestion.buildList(8)
    ],
    'CO-ACCUSED': [
      RawOfficerSuggestion.build(
        {
          id: '1'
        }, {
          resultText: 'Bernadette Kelly',
          to: '/officer/1/',
          allegationCount: 10,
          sustainedCount: 2,
          birthYear: 1972,
          race: 'White',
          gender: 'Male'
        }
      )
    ],
    'UNIT': [],
    'NEIGHBORHOOD': [
      RawNeighborhoodSuggestion.build({ id: '1' }, { resultText: 'Kenwood' }),
      RawNeighborhoodSuggestion.build({ id: '2' }, { resultText: 'Austin' }),
      RawNeighborhoodSuggestion.build({ id: '3' }, { resultText: 'Englewood' }),
      RawNeighborhoodSuggestion.build({ id: '4' }, { resultText: 'Loop' }),
      RawNeighborhoodSuggestion.build({ id: '5' }, { resultText: 'Garfield Park' }),
      RawNeighborhoodSuggestion.build({ id: '6' }, { resultText: 'Humboldt Park' }),
      RawNeighborhoodSuggestion.build({ id: '7' }, { resultText: 'Auburn Gresham' }),
    ]
  },
  'noresult': {},
  'foo': {
    'OFFICER': [
      RawOfficerSuggestion.build({}, { resultText: 'Laurence Lanners', to: '/officer/5678/' })
    ]
  }
};

export const singleGroupSuggestions = {
  'default': {
    count: 30,
    previous: null,
    next: 'http://my/api/?contentType=OFFICER&offset=20',
    results: [
      RawOfficerSuggestion.build({}, { resultText: 'Bernadette Kelly' }),
      RawOfficerSuggestion.build({}, { resultText: 'Charles Kelly' }),
      ...RawOfficerSuggestion.buildList(18)
    ]
  },
  neighborhoods: {
    count: 7,
    previous: null,
    next: null,
    results: [
      RawNeighborhoodSuggestion.build({ id: '1' }, { resultText: 'Kenwood' }),
      RawNeighborhoodSuggestion.build({ id: '2' }, { resultText: 'Austin' }),
      RawNeighborhoodSuggestion.build({ id: '3' }, { resultText: 'Englewood' }),
      RawNeighborhoodSuggestion.build({ id: '4' }, { resultText: 'Loop' }),
      RawNeighborhoodSuggestion.build({ id: '5' }, { resultText: 'Garfield Park' }),
      RawNeighborhoodSuggestion.build({ id: '6' }, { resultText: 'Humboldt Park' }),
      RawNeighborhoodSuggestion.build({ id: '7' }, { resultText: 'Auburn Gresham' }),
    ]
  },
  offset20: {
    count: 30,
    previous: null,
    next: null,
    results: RawOfficerSuggestion.buildList(10)
  }
};
