import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import faqPage from './faq-page';
import landingPage from './landing-page';
import searchPage from './search-page';
import authentication from './authentication';
import appContent from './app-content';
import reportingPage from './reporting-page';
import reports from './reports';
import faqs from './faqs';
import crs from './crs';
import bottomSheet from './bottom-sheet';
import officerPage from './officer-page';
import resolvingPage from './resolving-page';
import crPage from './cr-page';


export default combineReducers({
  landingPage,
  searchPage,
  faqPage,
  authentication,
  appContent,
  reportingPage,
  reports,
  faqs,
  crs,
  bottomSheet,
  routing: routerReducer,
  officerPage,
  resolvingPage,
  crPage
});
