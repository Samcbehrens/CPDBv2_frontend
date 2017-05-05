const results = {
  '1': [
    {
      kind: 'CR',
      year: 2005
    },
    {
      kind: 'Unit',
      year: 2005
    },
    {
      kind: 'CR',
      year: 2004
    },
    {
      kind: 'Unit',
      year: 2004
    },
    {
      kind: 'CR',
      year: 2003
    },
    {
      kind: 'Unit',
      year: 2003
    },
    {
      kind: 'CR',
      year: 2002
    },
    {
      kind: 'Unit',
      year: 2002
    },
    {
      kind: 'Unit',
      year: 2001
    },
    {
      kind: 'Joined',
      year: 2001
    }
  ],
  '1234': [{ kind: 'Joined', year: 2001 }],
  '5678': []
};

export default (offierId=1) => results[`${offierId}`];
