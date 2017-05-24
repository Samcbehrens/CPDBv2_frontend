import axiosMockClient from 'utils/axios-mock-client';
import {
  LANDING_PAGE_API_URL, SIGNIN_URL, RESET_PASSWORD_URL, MAIL_CHIMP_URL,
  REPORTS_API_URL, FAQS_API_URL, SEARCH_OFFICER_URL, OFFICER_URL
} from 'utils/constants';

import OfficerFactory from 'utils/test/factories/officer';
import landingPageGetData from './landing-page/get-data';
import reportingPageGetData from './reporting-page/get-data';
import FAQPageGetData from './faq-page/get-data';
import suggestionGetData from './landing-page/suggestions';
import getSummaryData from './officer-page/get-summary';
import getUnmatchableData from './resolving-page/get-unmatchable';
import getUnmergeableData from './resolving-page/get-unmergeable';


const SEARCH_API_URL = /^suggestion\/([^/]*)\//;

axiosMockClient.onGet(LANDING_PAGE_API_URL).reply(200, landingPageGetData);
/* istanbul ignore next */
axiosMockClient.onGet(REPORTS_API_URL).reply(() => [200, reportingPageGetData()]);
/* istanbul ignore next */
axiosMockClient.onGet(new RegExp(`${FAQS_API_URL}\?.+`)).reply(() => [200, FAQPageGetData()]);

axiosMockClient.onPost(SIGNIN_URL, { username: 'username', password: 'password' })
  .reply(200, { 'apiAccessToken': '055a5575c1832e9123cd546fe0cfdc8607f8680c' });
axiosMockClient.onPost(SIGNIN_URL, { username: 'badname', password: 'badpassword' })
  .reply(400, { 'message': 'Bad username/password' });

axiosMockClient.onPost(RESET_PASSWORD_URL, { email: 'valid@email.com' })
  .reply(200, { 'message': 'Please check your email for a password reset link.' });
axiosMockClient.onPost(RESET_PASSWORD_URL, { email: 'invalid@email.com' })
  .reply(400, { 'message': 'Sorry, there\'s no account registered with this email address.' });

// remove "/" from beginning of any v1 path for axios mock adapter to work.
let mailChimpUrl = MAIL_CHIMP_URL.slice(1);
axiosMockClient.onPost(mailChimpUrl, { email: 'valid@email.com' }).reply(200, { 'success': true });
axiosMockClient.onPost(mailChimpUrl, { email: 'invalid@email.com' })
  .reply(400, {
    'detail': 'invalid@email.com looks fake or invalid, please enter a real email address.', 'success': false
  });

axiosMockClient.onGet(SEARCH_API_URL).reply(function (config) {
  const matchs = SEARCH_API_URL.exec(config.url);
  return [200, suggestionGetData[config.params.contentType || matchs[1]] || suggestionGetData['default']];
});

axiosMockClient.onGet(`${SEARCH_OFFICER_URL}foo/`).reply(() => [200, OfficerFactory.buildList(3)]);
axiosMockClient.onGet(`${SEARCH_OFFICER_URL}notfound/`).reply(200, []);

axiosMockClient.onGet(`${OFFICER_URL}1/summary/`).reply(200, getSummaryData());

axiosMockClient.onGet(/unmatchable/).reply(config => {
  if (config.url.includes('offset=0')) {
    return [200, getUnmatchableData(0)];
  } else if (config.url.includes('offset=1')) {
    return [200, getUnmatchableData(1)];
  } else {
    return [200, getUnmatchableData(2)];
  }
});

axiosMockClient.onGet(/unmergeable/).reply(config => {
  if (config.url.includes('offset=0')) {
    return [200, getUnmergeableData(0)];
  } else if (config.url.includes('offset=1')) {
    return [200, getUnmergeableData(1)];
  } else {
    return [200, getUnmergeableData(2)];
  }
});

axiosMockClient.onPut(/unmatchable\/1/, { 'candidate_pk': 1 }).reply(
  200, { 'code': '001', 'message': 'Merge successfully' }
);

/*istanbul ignore next*/
export function getMockAdapter() {
  if (global.LIVE_TEST !== undefined) {
    return axiosMockClient.adapter();
  }
  return null;
}
