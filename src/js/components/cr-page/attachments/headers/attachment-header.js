import React, { PropTypes, Component } from 'react';

import RequestDocumentButton from 'components/common/request-document-button';
import styles from './attachment-header.sass';


export default class AttachmentHeader extends Component {
  render() {
    const { openNewDocumentNotificationsModal, alreadyRequested } = this.props;

    return (
      <div className={ styles.attachmentHeader }>
        <div className='attachment-message'>
          <span className='attachment-title'>ATTACHMENTS</span>
          <span className='attachment-subtitle no-print'>MAY CONTAIN GRAPHIC CONTENT</span>
        </div>
        <div className='attachment-request-button no-print'>
          <RequestDocumentButton
            alreadyRequested={ alreadyRequested }
            openRequestDocumentModal={ openNewDocumentNotificationsModal }
            hasData={ true }
          />
        </div>
      </div>
    );
  }
}

AttachmentHeader.propTypes = {
  openNewDocumentNotificationsModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
};
