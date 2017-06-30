import { findIndex } from 'lodash';


export default params => {
  const results = [
    { key: { 'sort': '-query' }, value: defaultTrackings },
    { key: { 'sort': '-query', 'limit': '1', 'offset': '1' }, value: loadMoreTrackings },
    { key: { 'sort': 'query' }, value: reversedTrackings },
    { key: { 'sort': '-query', 'query_types': 'free_text' }, value: freeTextTrackings },
    { key: { 'sort': '-query', 'query_types': 'free_text,no_interaction' }, value: freeTextAndNoInteractionTrackings },
    { key: { 'sort': '-query', 'search': 'A' }, value: onTermTrackings }
  ];

  return results[findIndex(results, ['key', params])].value;
};

const trackings = [
  {
    'id': 2,
    'query': 'Ke',
    'usages': 2,
    'results': 22,
    'query_type': 'free_text',
    'last_entered': '2017-06-22T10:53:53.916552Z'
  },
  {
    'id': 1,
    'query': 'Ab',
    'usages': 2,
    'results': 0,
    'query_type': 'no_interaction',
    'last_entered': '2017-06-22T10:53:52.902116Z'
  },
  {
    'id': 3,
    'query': 'Kevi',
    'usages': 3,
    'results': 33,
    'query_type': 'free_text',
    'last_entered': '2017-06-22T10:53:53.916552Z'
  }
];

const defaultTrackings = { next: 'localhost/?limit=1&offset=1', results: trackings.slice(0, 2) };
const loadMoreTrackings = { next: null, results: trackings.slice(2, 3) };
const reversedTrackings = { next: null, results: [trackings[1], trackings[0]] };
const freeTextTrackings = { next: null, results: [trackings[0]] };
const freeTextAndNoInteractionTrackings = { next: null, results: trackings.slice(0) };
const onTermTrackings = { next: null, results: [trackings[1]] };
