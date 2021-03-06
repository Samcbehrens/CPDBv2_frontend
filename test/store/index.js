import configureStore from 'store';
import { OFFICER_EDIT_TYPES, CR_EDIT_TYPES, TRR_EDIT_TYPES } from 'utils/constants';


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
      pathname: null,
      landingPage: {
        activityGrid: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false
        },
        officersByAllegation: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false
        },
        recentDocument: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false
        },
        complaintSummaries: {
          cards: [],
          isRequesting: false,
          headerEditModeOn: false
        },
        heatMap: {
          citySummary: {},
          communities: null,
          clusterGeoJson: null
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
      cms: {
        pages: {}
      },
      pageLoading: false,
      popups: [],
      routing: {
        locationBeforeTransitions: null
      },
      searchPage: {
        navigation: { 'itemIndex': 0 },
        isRequesting: false,
        suggestionGroups: {
          meta: {}
        },
        pagination: {},
        contentType: null,
        recentSuggestions: [],
        tags: [],
        query: '',
        searchTerms: {
          categories: [],
          hidden: true,
          navigation: {
            itemIndex: 0
          }
        }
      },
      inlineAliasAdminPage: {},
      crPage: {
        isRequesting: false,
        crid: null,
        officerId: null,
        attachmentRequest: {
          request: {
            isRequested: false,
            message: ''
          },
          subscribedCRIDs: {}
        },
        relatedComplaints: {
          relatedByCategory: {
            count: 0,
            pagination: {
              next: null,
              previous: null
            },
            cards: {
              meta: {
                crPageCrid: null,
                distance: null
              },
              cards: []
            }
          },
          relatedByOfficer: {
            count: 0,
            pagination: {
              next: null,
              previous: null
            },
            cards: {
              meta: {
                crPageCrid: null,
                distance: null
              },
              cards: []
            }
          }
        },
        editModeOn: {
          [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        }
      },
      trrPage: {
        trrId: null,
        data: {},
        isRequesting: false,
        attachmentRequest: {
          request: {
            isRequested: false,
            message: '',
          },
          subscribedTRRIds: {},
        },
        editModeOn: {
          [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        }
      },
      crs: {},
      officerPage: {
        activeTab: null,
        currentTab: 'TIMELINE',
        fullName: '',
        breadcrumbCachedFullName: '',
        isRequesting: false,
        officerId: null,
        summary: {},
        newTimeline: {
          filter: {
            label: 'ALL',
            kind: ['CR', 'FORCE', 'AWARD']
          },
          isRequesting: false,
          items: []
        },
        coaccusals: {
          isRequesting: false,
          items: []
        },
        editModeOn: {
          [OFFICER_EDIT_TYPES.TRIANGLE]: false,
          [OFFICER_EDIT_TYPES.SCALE]: false,
          [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
        },
        zipFileUrl: { withDocs: '', withoutDocs: '' }
      },
      unitProfilePage: {
        isRequesting: false,
        summary: {}
      },
      genericModal: {
        activeModal: null
      },
      breadcrumb: {
        breadcrumbs: []
      },
      breadcrumbsMapping: {},
      headers: {
        shareableHeader: {
          scrollPosition: null
        },
        slimHeader: {
          logoSectionEditModeOn: false
        }
      },
      embed: {
        officers: []
      }
    });
  });
});
