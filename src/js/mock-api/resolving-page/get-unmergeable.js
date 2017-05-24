const record = {
  'id': 1,
  'middle_initial': 'M',
  'first_name': 'Pamelia',
  'last_name': 'Bahringer',
  'tags': [],
  'gender': 'F',
  'rank': 'dolor',
  'race': 'White',
  'active': false,
  'appointed_date': '2008-11-04',
  'birth_year': 1940
};

const candidate = {
  'id': 1,
  'middle_initial': 'M',
  'first_name': 'Pamelia',
  'last_name': 'Bahringer',
  'tags': [],
  'gender': 'F',
  'officerbadgenumber_set': [],
  'rank': 'dolor',
  'race': 'White',
  'resignation_date': null,
  'officerhistory_set': [],
  'active': true,
  'appointed_date': '2007-11-04',
  'birth_year': 1940
};


export default offset => {
  if (offset === 0) {
    return {
      'count': 2,
      'next': 'http://localhost:8000/api/v1/unmergeable/?limit=1&offset=1',
      'previous': null,
      'offset': 0,
      results: [{ 'id': 1, 'record': record, 'candidate': candidate }]
    };
  } else if (offset === 1) {
    return {
      'count': 2,
      'next': null,
      'previous': 'http://localhost:8000/api/v1/unmergeable/?limit=1&offset=0',
      'offset': 1,
      results: [{ 'id': 1, 'record': record, 'candidate': candidate }]
    };
  } else {
    return {
      'count': 0,
      'next': null,
      'previous': null,
      'results': []
    };
  }
};
