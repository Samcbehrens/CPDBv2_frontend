import lodash from 'lodash';
import { spy } from 'sinon';

import { cardsSelector, hasCards } from 'selectors/landing-page/officers-by-allegation';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';


describe('officers-by-allegation selectors', function () {
  let state;

  beforeEach(function () {
    state = {
      landingPage: {
        officersByAllegation: {}
      }
    };
  });

  describe('cardsSelector', function () {
    it('should return a list of cards', function () {
      state.landingPage.officersByAllegation.cards = RawOfficerCardFactory.buildList(40);
      cardsSelector(state).should.have.length(40);
    });

    it('should shuffle cards', function () {
      const stubShuffle = spy(lodash, 'shuffle');
      state.landingPage.officersByAllegation.cards = lodash.range(40);

      cardsSelector(state);

      stubShuffle.calledWith(lodash.range(0, 12)).should.be.true();
      stubShuffle.calledWith(lodash.range(12, 40)).should.be.true();

      stubShuffle.restore();
    });

  });

  describe('hasCards', function () {
    it('should return true if officersByAllegation has data', function () {
      state.landingPage.officersByAllegation.cards = ['abc'];
      hasCards(state).should.be.true();
    });

    it('should return false if officersByAllegation does not have data', function () {
      state.landingPage.officersByAllegation.cards = [];
      hasCards(state).should.be.false();
    });
  });
});
