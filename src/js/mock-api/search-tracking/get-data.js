const results = {
  0: {
    next: 'localhost/?limit=1&offset=1',
    results: [
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
        'query_type': 'free_text',
        'last_entered': '2017-06-22T10:53:52.902116Z'
      }
    ]
  },
  1: {
    next: null,
    results: [
      {
        'id': 3,
        'query': 'Kevi',
        'usages': 3,
        'results': 33,
        'query_type': 'free_text',
        'last_entered': '2017-06-22T10:53:53.916552Z'
      }
    ]
  }
};

export default (offset=0) => (results[offset]);

export const reversedSearchTrackingData = () => ({
  results: [
    {
      'id': 1,
      'query': 'Ab',
      'usages': 2,
      'results': 0,
      'query_type': 'free_text',
      'last_entered': '2017-06-22T10:53:52.902116Z'
    },
    {
      'id': 2,
      'query': 'Ke',
      'usages': 2,
      'results': 22,
      'query_type': 'free_text',
      'last_entered': '2017-06-22T10:53:53.916552Z'
    }
  ]
});
