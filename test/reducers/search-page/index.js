import searchPage from 'reducers/search-page';


describe('searchPage reducer', function () {
  it('should have initial state', function () {
    searchPage(undefined, {}).should.deepEqual({
      navigation: [0, 0],
      isRequesting: false,
      suggestionGroups: {},
      contentType: null,
      recentSuggestions: [],
      tags: []
    });
  });
});
