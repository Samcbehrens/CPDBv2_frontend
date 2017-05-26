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

let _data = [
  { 'id': 0, 'record': record, 'candidate': candidate },
  { 'id': 1, 'record': record, 'candidate': candidate }
];

export const deleteUnmergeable = (offset) => {
  _data.splice(offset, 1);
};

export default offset => {
  const data = _data;

  const count = data.length;
  const next = offset < count - 1 ? `http://localhost:8000/api/v1/unmergeable/?limit=1&offset=${offset + 1}` : null;
  const previous = offset > 0 ? `http://localhost:8000/api/v1/unmergeable/?limit=1&offset=${offset - 1}` : null;
  const results = [data[offset]];

  return {
    count, next, previous, offset, results
  };
};
