import {
  OPEN_BOTTOM_SHEET_WITH_REPORT,
  OPEN_BOTTOM_SHEET_WITH_FAQ
} from 'actions/bottom-sheet';
import { EXPAND_FAQ } from 'actions/faq-page/index';
import { trackClickedReportingItem, trackClickedFaqItem } from 'utils/intercom';


export default store => next => action => {
  if (action.type === OPEN_BOTTOM_SHEET_WITH_REPORT) {
    const report = action.payload;
    trackClickedReportingItem(report.id, report.title);
  }

  if (action.type === EXPAND_FAQ || action.type === OPEN_BOTTOM_SHEET_WITH_FAQ) {
    debugger
    const { id, question, answer } = action.payload;
    trackClickedFaqItem(id, question, answer);
  }

  return next(action);
};
