import {
  nextUrlSelector, prevUrlSelector, countSelector, offsetSelector, officerMatchingSelector
} from 'selectors/resolving-page';


describe('resolvingPage selectors', function () {
  const state = {
    resolvingPage: {
      unmatchable: {
        next: 'next',
        previous: 'previous',
        count: 2,
        offset: 1,
        results: [
          {
            record: 'record',
            candidates: 'candidates'
          }
        ]
      }
    }
  };

  const emptyState = {
    resolvingPage: {
      unmatchable: {}
    }
  };

  describe('nextUrlSelector', function () {
    it('should return empty string if next url does not exist', function () {
      nextUrlSelector(emptyState).should.be.empty();
    });

    it('should return next url correctly', function () {
      nextUrlSelector(state).should.equal('next');
    });
  });

  describe('prevUrlSelector', function () {
    it('should return empty string if previous url does not exist', function () {
      prevUrlSelector(emptyState).should.be.empty();
    });

    it('should return previous url correctly', function () {
      prevUrlSelector(state).should.equal('previous');
    });
  });

  describe('countSelector', function () {
    it('should return zero if count does not exist', function () {
      countSelector(emptyState).should.equal(0);
    });

    it('should return count correctly', function () {
      countSelector(state).should.equal(2);
    });
  });

  describe('offsetSelector', function () {
    it('should return zero if offset does not exist', function () {
      offsetSelector(emptyState).should.equal(0);
    });

    it('should return offset correctly', function () {
      offsetSelector(state).should.equal(1);
    });
  });

  describe('officerMatchingSelector', function () {
    it('should return empty record and candidates if does not exist', function () {
      officerMatchingSelector(emptyState).should.eql({
        record: {},
        candidates: []
      })
    });

    it('should return record and candidates correctly', function () {
      officerMatchingSelector(state).should.eql({
        record: 'record',
        candidates: 'candidates'
      });
    });
  });
});
