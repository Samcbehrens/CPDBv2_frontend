import configureStore from 'store';


function setUp() {
  const store = configureStore(undefined);
  let currentState;

  const observer = () => {
    currentState = store.getState();
  };

  function getCurrentState() {
    return currentState;
  }

  let unsubscribe = store.subscribe(observer);
  observer();

  return {
    store,
    getCurrentState,
    unsubscribe
  };
}

describe('store', function () {
  it('should have initial state', function () {
    const { getCurrentState } = setUp();
    getCurrentState().should.eql({
      landingPage: {
        faqSection: {
          faqs: [],
          fields: {},
          editModeOn: false
        },
        reportSection: {
          fields: {},
          editModeOn: false,
          reports: []
        },
        heroSection: {},
        vftgSection: {
          fields: {},
          editModeOn: false
        },
        aboutSection: {
          fields: {},
          editModeOn: false
        },
        collaborateSection: {
          fields: {},
          editModeOn: false
        },
        suggestionApp: {
          isRequesting: false,
          suggestionGroups: {},
          contentType: null,
          tags: []
        },
        isRequesting: false
      },
      faqPage: {
        faqs: {
          results: [],
          count: 0,
          next: null,
          previous: null
        },
        isRequesting: false,
        faqForm: {
          isSubmitting: false
        }
      },
      authentication: {
        loginErrorMessage: null,
        loginSuccessMessage: null,
        forgotPasswordErrorMessage: null,
        apiAccessToken: null,
        showForgotPasswordModal: false
      },
      appContent: null,
      reportingPage: {
        isRequesting: false,
        reportGrouping: {
          groups: [],
          groupingStrategy: 'STRATEGY_RANDOM',
          existingReportIds: []
        },
        pagination: {
          next: null,
          previous: null,
          count: 0
        }
      },
      reports: {},
      faqs: {},
      routing: {
        locationBeforeTransitions: null
      }
    });
  });
});
