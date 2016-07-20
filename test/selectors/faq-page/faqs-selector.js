import { faqsSelector, dataAvailableSelector, paginationSelector } from 'selectors/faq-page/faqs-selector';
import FAQFactory from 'utils/test/factories/faq';
import PaginationFactory from 'utils/test/factories/pagination';


describe('faqs selectors', function () {
  let state = {
    faqPage: {}
  };

  beforeEach(function () {
    state.faqPage = {};
  });

  describe('faqsSelector', function () {
    it('should return available faqs', function () {
      const faq = FAQFactory.build();
      state.faqPage = {
        faqs: PaginationFactory.build({ results: [faq] })
      };

      faqsSelector(state).should.eql([faq]);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.faqPage = {
        faqs: PaginationFactory.build({ results: FAQFactory.buildList(3) }),
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 2 faqs and requesting is false', function () {
      state.faqPage = {
        isRequesting: false,
        faqs: PaginationFactory.build({ results: FAQFactory.buildList(3) })
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 faqs', function () {
      state.faqPage = {
        faqs: PaginationFactory.build({ results: FAQFactory.buildList(2) })
      };
      dataAvailableSelector(state).should.be.false();
    });
  });

  describe('paginationSelector', function () {
    it('should return count, next and previous', function () {
      const next = 'next';
      const previous = 'previous';
      const count = 'count';

      state.faqPage = {
        faqs: { next, previous, count }
      };

      paginationSelector(state).should.eql({ next, previous, count });
    });
  });
});