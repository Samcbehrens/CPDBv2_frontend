import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import authentication from './authentication';
import bottomSheet from './bottom-sheet';
import reportingPage from './reporting-page';
import reports from './reports';
import faqs from './faqs';


export default combineReducers({
  landingPage,
  faqPage,
  authentication,
  bottomSheet,
  reportingPage,
  reports,
  faqs,
  routing: routerReducer
});
