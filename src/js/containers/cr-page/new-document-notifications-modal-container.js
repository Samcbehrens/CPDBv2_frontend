import React from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash';

import { requestDocument } from 'actions/cr-page';
import { getCRID } from 'utils/location';
import NewDocumentNotificationsModalContent from 'components/generic-modal/new-document-notifications-modal-content';
import { CR_EDIT_TYPES, CR_PAGE_ID } from 'utils/constants';
import {
  turnOnNewDocumentNotificationEditMode,
  turnOffNewDocumentNotificationEditMode
} from 'actions/cr-page';
import { updatePage } from 'actions/cms';
import { getCMSFields } from 'selectors/cms';
import { getEditModeOn } from 'selectors/cr-page';


const mapDispatchToProps = {
  onRequestDocument: requestDocument,
  turnOnNewDocumentNotificationEditMode,
  turnOffNewDocumentNotificationEditMode,
  onSaveForm: updatePage(CR_PAGE_ID),
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: getCRID(ownProps.location.pathname),
    message: state.crPage.attachmentRequest.request.message,
    isRequested: state.crPage.attachmentRequest.request.isRequested,
    editableFields: getCMSFields(CR_PAGE_ID)(state),
    editModeOn: getEditModeOn(state),
  };
};

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'editModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnNewDocumentNotificationEditMode',
      'turnOffNewDocumentNotificationEditMode',
    ]),
    instructionEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnNewDocumentNotificationEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffNewDocumentNotificationEditMode
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  editWrapperStateProps
)(NewDocumentNotificationsModalContent);
