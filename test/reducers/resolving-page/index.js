import resolvingPage from 'reducers/resolving-page';


describe('resolvingPage reducer', function () {
  it('should return initial state', function () {
    resolvingPage(undefined, {}).should.eql({
      unmatchable: {},
      unmergeable: {},
      dedupeTraining: {}
    });
  });
});
