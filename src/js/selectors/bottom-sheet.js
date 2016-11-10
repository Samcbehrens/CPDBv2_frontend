import { createSelector } from 'reselect';
import { find, get } from 'lodash';

import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';
import {
  getField, createFieldWithEmptyEditorState, createEmptyStringField,
  createEmptyDateField
} from 'utils/draft';


const getReports = state => state.reports;
const getContentId = state => state.bottomSheet.content.id;
const getFAQs = state => state.faqs;

export const reportSelector = createSelector(
  getReports,
  getContentId,
  (reports, id) => {
    const report = find(reports, report => report.id === id);
    return {
      id: get(report, 'id', null),
      fields: (
        report ?
        {
          'title': getField(report.fields, 'title'),
          'publication': getField(report.fields, 'publication'),
          'publish_date': getField(report.fields, 'publish_date'),
          'author': getField(report.fields, 'author'),
          'excerpt': getField(report.fields, 'excerpt'),
          'article_link': getField(report.fields, 'article_link')
        } :
        {
          'title': createFieldWithEmptyEditorState('title', 'plain_text'),
          'publication': createEmptyStringField('publication'),
          'publish_date': createEmptyDateField('publish_date'),
          'author': createEmptyStringField('author'),
          'excerpt': createFieldWithEmptyEditorState('excerpt', 'multiline_text'),
          'article_link': createFieldWithEmptyEditorState('article_link', 'rich_text')
        }
      )
    };
  }
);

export const faqSelector = createSelector(
  getFAQs,
  getContentId,
  (faqs, id) => {
    const faq = find(faqs, faq => faq.id === id);
    return {
      id: get(faq, 'id', null),
      fields: {
        'question': faq ?
          getField(faq.fields, 'question') :
          createFieldWithEmptyEditorState('question', 'plain_text'),
        'answer': faq ?
          getField(faq.fields, 'answer') :
          createFieldWithEmptyEditorState('answer', 'multiline_text')
      }
    };
  }
);

export const contentSelector = (state) => {
  if (!state.bottomSheet.content) {
    return null;
  }

  const contentType = state.bottomSheet.content.type;
  let props;

  if (contentType === REPORT_TYPE) {
    props = reportSelector(state);
  }

  if (contentType === FAQ_TYPE) {
    props = faqSelector(state);
  }

  return {
    type: contentType,
    props
  };
};