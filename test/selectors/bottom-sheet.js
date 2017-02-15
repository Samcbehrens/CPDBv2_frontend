import moment from 'moment';
import draftJs from 'draft-js';
import { stub } from 'sinon';
import should from 'should';

import '../setup';
import {
  contentSelector, reportSelector, faqSelector, officersToSnakeCase
} from 'selectors/bottom-sheet';
import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';
import ReportFactory from 'utils/test/factories/report';
import FaqFactory from 'utils/test/factories/faq';
import { StringFieldFactory, DateFieldFactory, RichTextFieldFactory, FieldFactory } from 'utils/test/factories/field';


describe('bottomSheet selector', function () {
  const emptyReportFields = {
    'title': RichTextFieldFactory.build({ name: 'title' }, { blockTexts: [''] }),
    'publication': StringFieldFactory.build({ name: 'publication', value: '' }),
    'publish_date': DateFieldFactory.build(
      { name: 'publish_date', value: moment().format('YYYY-MM-DD') }
    ),
    'author': StringFieldFactory.build({ name: 'author', value: '' }),
    'excerpt': RichTextFieldFactory.build(
      { name: 'excerpt' }, { blockTexts: [''] }
    ),
    'article_link': RichTextFieldFactory.build(
      { name: 'article_link' }, { blockTexts: [''] }
    ),
    'officers': FieldFactory.build({ name: 'officers', type: 'officers_list', value: [] })
  };
  const emptyFaqFields = {
    question: RichTextFieldFactory.build({ name: 'question' }, { blockTexts: [''] }),
    answer: RichTextFieldFactory.build({ name: 'answer' }, { blockTexts: [''] })
  };

  describe('reportSelector', function () {
    it('should return existing report', function () {
      const title = 'a';
      const publication = 'b';
      const publishDate = '2016-10-03';
      const author = 'c';
      const excerpt = 'd';
      const articleLink = 'e';
      const officers = [1];
      const state = {
        reports: [
          ReportFactory.build({ id: 1 }, {
            title, publication, publishDate, author, excerpt, articleLink, officers
          })
        ]
      };
      const props = {
        content: {
          type: REPORT_TYPE,
          id: 1
        }
      };
      reportSelector(state, props).should.eql({
        id: 1,
        fields: {
          'title': RichTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
          'publication': StringFieldFactory.build({ name: 'publication', value: publication }),
          'publish_date': DateFieldFactory.build({ name: 'publish_date', value: publishDate }),
          'author': StringFieldFactory.build({ name: 'author', value: author }),
          'excerpt': RichTextFieldFactory.build(
            { name: 'excerpt' }, { blockTexts: [excerpt] }
          ),
          'article_link': RichTextFieldFactory.build(
            { name: 'article_link' }, { blockTexts: [articleLink] }
          ),
          'officers': FieldFactory.build(
            { name: 'officers', type: 'officers_list', value: officers }
          )
        }
      });
    });

    it('should return empty report when id is "new"', function () {
      const state = {
        reports: []
      };
      const props = {
        content: {
          type: REPORT_TYPE,
          id: 'new'
        }
      };
      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      reportSelector(state, props).should.eql({
        id: null,
        fields: emptyReportFields
      });
      stubGenKey.restore();
    });
  });

  describe('faqSelector', function () {
    it('should return existing faq', function () {
      const question = 'question';
      const answer = 'answer';
      const state = {
        faqs: [
          FaqFactory.build({ id: 1 }, { question, answer })
        ]
      };
      const props = {
        content: {
          type: FAQ_TYPE,
          id: 1
        }
      };
      faqSelector(state, props).should.eql({
        id: 1,
        fields: {
          'question': RichTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
          'answer': RichTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
        }
      });
    });

    it('should return empty faq when id is "new"', function () {
      const state = {
        faqs: []
      };
      const props = {
        content: {
          type: REPORT_TYPE,
          id: 'new'
        }
      };
      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      faqSelector(state, props).should.eql({
        id: null,
        fields: emptyFaqFields
      });
      stubGenKey.restore();
    });
  });

  describe('contentSelector', function () {
    it('should return null when bottomSheet has no content', function () {
      should(contentSelector({}, {})).be.null();
    });

    it('should return report props if content type is REPORT_TYPE', function () {
      const title = 'a';
      const publication = 'b';
      const publishDate = '2016-10-03';
      const author = 'c';
      const excerpt = 'd';
      const articleLink = 'e';
      const officers = [1];
      const state = {
        reports: [
          ReportFactory.build({ id: 1 }, {
            title, publication, publishDate, author, excerpt, articleLink, officers
          })
        ]
      };
      const props = {
        content: {
          type: REPORT_TYPE,
          id: 1
        }
      };

      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      contentSelector(state, props).should.eql({
        type: REPORT_TYPE,
        props: {
          id: 1,
          fields: {
            'title': RichTextFieldFactory.build({ name: 'title' }, { blockTexts: [title] }),
            'publication': StringFieldFactory.build({ name: 'publication', value: publication }),
            'publish_date': DateFieldFactory.build({ name: 'publish_date', value: publishDate }),
            'author': StringFieldFactory.build({ name: 'author', value: author }),
            'excerpt': RichTextFieldFactory.build(
              { name: 'excerpt' }, { blockTexts: [excerpt] }
            ),
            'article_link': RichTextFieldFactory.build(
              { name: 'article_link' }, { blockTexts: [articleLink] }
            ),
            'officers': FieldFactory.build(
              { name: 'officers', type: 'officers_list', value: officers }
            )
          }
        }
      });
      stubGenKey.restore();
    });

    it('should return faq props if content type is FAQ_TYPE', function () {
      const question = 'question';
      const answer = 'answer';
      const state = {
        faqs: [
          FaqFactory.build({ id: 1 }, { question, answer })
        ]
      };
      const props = {
        content: {
          type: FAQ_TYPE,
          id: 1
        }
      };
      const stubGenKey = stub(draftJs, 'genKey');
      stubGenKey.returns('abc12');
      contentSelector(state, props).should.eql({
        type: FAQ_TYPE,
        props: {
          id: 1,
          fields: {
            'question': RichTextFieldFactory.build({ name: 'question' }, { blockTexts: [question] }),
            'answer': RichTextFieldFactory.build({ name: 'answer' }, { blockTexts: [answer] })
          }
        }
      });
      stubGenKey.restore();
    });
  });

  describe('officersToSnakeCase', function () {
    it('should return list of ids of officers', function () {
      const officers = [{ id: 1, fullName: 'Foo' }, { id: 2, fullName: 'Bar' }];

      officersToSnakeCase(officers).should.eql([{ id: 1 }, { id: 2 }]);
    });
  });
});
