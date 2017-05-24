import Enum from 'enum';


export const TOP = 'top';
export const BOTTOM = 'bottom';

export const MOBILE_BREAK_POINT = 768;
export const TABLET_BREAK_POINT = 992;
export const DESKTOP_BREAK_POINT = 1200;

export const DEFAULT_IMAGE_DIMENSION = '480_320';

export const EXTRA_WIDE = 'extra_wide';
export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';
export const TABLET = 'tablet';

export const ROOT_PATH = '/';
export const COLLAB_PATH = 'collaborate/';
export const DATA_PATH = 'data/';
export const FAQ_PATH = 'faq/';
export const STORIES_PATH = 'reporting/';
export const SEARCH_PATH = 'search/';
export const OFFICER_PATH = 'officer/:officerId';
export const RESOLVING_PATH = 'resolving/';
export const OFFICER_TIMELINE_PATH = 'officer/:officerId/timeline';
export const CR_PATH = 'complaint/:crid/:officerId';

export const ROOT_EDIT_REGEX = /^\/(?:edit\/)?$/;

// Reducer defaults
export const PAGINATION_DEFAULT = {
  results: [],
  count: 0,
  next: null,
  previous: null
};

// Date format
export const DATE_FORMAT_IN = 'YYYY-MM-DD';
export const DATE_FORMAT = 'MMM DD, YYYY';

// Form state
export const FORM_INITIAL = 'FORM_INITIAL';
export const FORM_LOADING = 'FORM_LOADING';
export const FORM_SUCCESS = 'FORM_SUCCESS';
export const FORM_FAILURE = 'FORM_FAILURE';

export const ENTITY_LINK = 'LINK';

let API_ROOT = `${global.location.origin}/api/v1/`;
let API_ROOT_V2 = `${global.location.origin}/api/v2/`;

/* istanbul ignore next */
if (global.DEVELOPMENT) {
  const LOCAL_BASE_PATH = 'http://localhost:8000';
  API_ROOT = `${LOCAL_BASE_PATH}/api/v1/`;
  API_ROOT_V2 = `${LOCAL_BASE_PATH}/api/v2/`;
}

export const V2_ROOT_PATH = API_ROOT_V2;
export const V1_ROOT_PATH = API_ROOT;

export const LANDING_PAGE_API_URL = `${V2_ROOT_PATH}cms-pages/landing-page/`;
export const SIGNIN_URL = `${V2_ROOT_PATH}users/sign-in/`;
export const RESET_PASSWORD_URL = `${V2_ROOT_PATH}users/forgot-password/`;
export const REPORTS_API_URL = `${V2_ROOT_PATH}reports/`;
export const FAQS_API_URL = `${V2_ROOT_PATH}faqs/`;
export const MAIL_CHIMP_URL = '/vftg/';
export const EVENTS_API_URL = `${V2_ROOT_PATH}events/`;
export const SEARCH_OFFICER_URL = `${V2_ROOT_PATH}report-bottomsheet-officer-search/`;
export const OFFICER_URL = `${V2_ROOT_PATH}officers/`;
export const RESOLVING_MATCHING_URL = `${API_ROOT}unmatchable/`;
export const UNMERGEABLE_URL = `${API_ROOT}unmergeable/`;
export const CR_URL = `${V2_ROOT_PATH}cr/`;


export const DragTypes = {
  FAQ_ITEM: 'FAQ_ITEM'
};

export const FAQS_REQUEST_START = 'FAQS_REQUEST_START';
export const FAQS_REQUEST_SUCCESS = 'FAQS_REQUEST_SUCCESS';
export const FAQS_REQUEST_FAILURE = 'FAQS_REQUEST_FAILURE';

export const FAQ_REQUEST_START = 'FAQ_REQUEST_START';
export const FAQ_REQUEST_SUCCESS = 'FAQ_REQUEST_SUCCESS';
export const FAQ_REQUEST_FAILURE = 'FAQ_REQUEST_FAILURE';

export const FAQS_POST_START = 'FAQS_POST_START';
export const FAQS_POST_SUCCESS = 'FAQS_POST_SUCCESS';
export const FAQS_POST_FAILURE = 'FAQS_POST_FAILURE';

export const UPDATE_FAQ_REQUEST_START = 'UPDATE_FAQ_REQUEST_START';
export const UPDATE_FAQ_REQUEST_SUCCESS = 'UPDATE_FAQ_REQUEST_SUCCESS';
export const UPDATE_FAQ_REQUEST_FAILURE = 'UPDATE_FAQ_REQUEST_FAILURE';

export const BULK_UPDATE_FAQS_START = 'BULK_UPDATE_FAQS_START';
export const BULK_UPDATE_FAQS_SUCCESS = 'BULK_UPDATE_FAQS_SUCCESS';
export const BULK_UPDATE_FAQS_FAILURE = 'BULK_UPDATE_FAQS_FAILURE';

export const SEARCH_OFFICERS_REQUEST_START = 'SEARCH_OFFICERS_REQUEST_START';
export const SEARCH_OFFICERS_REQUEST_SUCCESS = 'SEARCH_OFFICERS_REQUEST_SUCCESS';
export const SEARCH_OFFICERS_REQUEST_FAILURE = 'SEARCH_OFFICERS_REQUEST_FAILURE';

export const OFFICER_SUMMARY_REQUEST_START = 'OFFICER_SUMMARY_REQUEST_START';
export const OFFICER_SUMMARY_REQUEST_SUCCESS = 'OFFICER_SUMMARY_REQUEST_SUCCESS';
export const OFFICER_SUMMARY_REQUEST_FAILURE = 'OFFICER_SUMMARY_REQUEST_FAILURE';

export const UNMATCHABLE_START = 'UNMATCHABLE_START';
export const UNMATCHABLE_SUCCESS = 'UNMATCHABLE_SUCCESS';
export const UNMATCHABLE_FAILURE = 'UNMATCHABLE_FAILURE';

export const UNMERGEABLE_START = 'UNMERGEABLE_START';
export const UNMERGEABLE_SUCCESS = 'UNMERGEABLE_SUCCESS';
export const UNMERGEABLE_FAILURE = 'UNMERGEABLE_FAILURE';

export const UNMERGEABLE_DELETE_START = 'UNMERGEABLE_DELETE_START';
export const UNMERGEABLE_DELETE_SUCCESS = 'UNMERGEABLE_DELETE_SUCCESS';
export const UNMERGEABLE_DELETE_FAILURE = 'UNMERGEABLE_DELETE_FAILURE';

export const MATCHING_API_START = 'MATCHING_API_START';
export const MATCHING_API_SUCCESS = 'MATCHING_API_SUCCESS';
export const MATCHING_API_FAILURE = 'MATCHING_API_FAILURE';

export const OPEN_BOTTOM_SHEET_WITH_REPORT = 'OPEN_BOTTOM_SHEET_WITH_REPORT';
export const OPEN_BOTTOM_SHEET_WITH_FAQ = 'OPEN_BOTTOM_SHEET_WITH_FAQ';
export const OPEN_BOTTOM_SHEET_WITH_OFFICER = 'OPEN_BOTTOM_SHEET_WITH_OFFICER';
export const OPEN_BOTTOM_SHEET_WITH_COMPLAINT = 'OPEN_BOTTOM_SHEET_WITH_COMPLAINT';
export const CLOSE_BOTTOM_SHEET = 'CLOSE_BOTTOM_SHEET';
export const OPEN_BOTTOM_SHEET_TO_CREATE_FAQ = 'OPEN_BOTTOM_SHEET_TO_CREATE_FAQ';
export const OPEN_BOTTOM_SHEET_TO_CREATE_REPORT = 'OPEN_BOTTOM_SHEET_TO_CREATE_REPORT';

export const CR_REQUEST_START = 'CR_REQUEST_START';
export const CR_REQUEST_SUCCESS = 'CR_REQUEST_SUCCESS';
export const CR_REQUEST_FAILURE = 'CR_REQUEST_FAILURE';

export const ALPHA_NUMBERIC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                               'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                               'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                               'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL';
export const CLOSE_FORGOT_PASSWORD_MODAL = 'CLOSE_FORGOT_PASSWORD_MODAL';
export const RECEIVE_TOKEN_FROM_COOKIE = 'RECEIVE_TOKEN_FROM_COOKIE';

export const LOG_OUT = 'LOG_OUT';

export const OFFICER_TIMELINE_MINIMAP_REQUEST_START = 'OFFICER_TIMELINE_MINIMAP_REQUEST_START';
export const OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS = 'OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE = 'OFFICER_TIMELINE_MINIMAP_REQUEST_FAILURE';
export const OFFICER_TIMELINE_ITEMS_REQUEST_START = 'OFFICER_TIMELINE_ITEMS_REQUEST_START';
export const OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS = 'OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE = 'OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE';
export const OFFICER_TIMELINE_FLIP_SORT_ORDER = 'OFFICER_TIMELINE_FLIP_SORT_ORDER';
export const OFFICER_TIMELINE_SELECT_MINIMAP_ITEM = 'OFFICER_TIMELINE_SELECT_MINIMAP_ITEM';
export const OFFICER_TIMELINE_HOVER_MINIMAP_ITEM = 'OFFICER_TIMELINE_HOVER_MINIMAP_ITEM';
export const OFFICER_TIMELINE_HOVER_TIMELINE_ITEM = 'OFFICER_TIMELINE_HOVER_TIMELINE_ITEM';
export const DO_NOTHING_ACTION = 'DO_NOTHING_ACTION';  // To be used when an action that do nothing is needed

export const BottomSheetContentType = new Enum(['REPORT', 'FAQ', 'OFFICER', 'CR']);

export const TimelineItemType = new Enum(['CR', 'UNIT', 'YEAR', 'JOINED']);

export const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGplNHMifQ.ky2VSGEYU5KritRMArHY-w';
