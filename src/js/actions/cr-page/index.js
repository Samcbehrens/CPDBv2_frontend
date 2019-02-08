import { createAction } from 'redux-actions';

import { get, post } from 'actions/common/async-action';
import {
  CR_URL,
  CR_REQUEST_START,
  CR_REQUEST_SUCCESS,
  CR_REQUEST_FAILURE,
  CR_REQUEST_DOC_START,
  CR_REQUEST_DOC_SUCCESS,
  CR_REQUEST_DOC_FAILURE,
  CR_EDIT_MODE,
  CR_EDIT_TYPES,
  TRACKING_CLICK_ATTACHMENT_START,
  TRACKING_CLICK_ATTACHMENT_SUCCESS,
  TRACKING_CLICK_ATTACHMENT_FAILURE,
} from 'utils/constants';


export const fetchCR = crid => (get(
  `${CR_URL}${crid}/`,
  [CR_REQUEST_START, CR_REQUEST_SUCCESS, CR_REQUEST_FAILURE]
)());

export const requestDocument = ({ id, email }) => post(
  `${CR_URL}${id}/request-document/`,
  [CR_REQUEST_DOC_START, CR_REQUEST_DOC_SUCCESS, CR_REQUEST_DOC_FAILURE]
)({ email: email });


const createChangeEditModeAction = (editType, mode) => createAction(
  CR_EDIT_MODE,
  () => ({ editType, mode })
);

export const turnOnNoAttachmentTextEditMode = createChangeEditModeAction(CR_EDIT_TYPES.NO_ATTACHMENT_TEXT, true);
export const turnOffNoAttachmentTextEditMode = createChangeEditModeAction(CR_EDIT_TYPES.NO_ATTACHMENT_TEXT, false);

export const turnOnDocumentRequestInstructionEditMode = createChangeEditModeAction(
  CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, true
);
export const turnOffDocumentRequestInstructionEditMode = createChangeEditModeAction(
  CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, false
);

export const trackingClickAttachment = ({ externalId, sourcePage, app }) => post(
  `${CR_URL}${externalId}/tracking-attachment/`,
  [TRACKING_CLICK_ATTACHMENT_START, TRACKING_CLICK_ATTACHMENT_SUCCESS, TRACKING_CLICK_ATTACHMENT_FAILURE]
)({ 'accessed_from_page': sourcePage, 'app': app });
