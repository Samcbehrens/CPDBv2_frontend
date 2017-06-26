import { searchTrackingListSelector } from 'selectors/tracking';


describe('search tracking selectors', function () {
  it('should return tracking list', function () {
    const state = {
      tracking: {
        searchTracking: {
          results: [
            {
              'query_type': 'foo'
            },
            {
              'last_entered': 'bar'
            }
          ]
        }
      }
    };

    searchTrackingListSelector(state).should.eql([
      {
        queryType: 'foo'
      },
      {
        lastEntered: 'bar'
      }
    ]);
  });
});
