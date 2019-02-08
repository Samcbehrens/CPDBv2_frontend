import React, { PropTypes } from 'react';
import { Style } from 'radium';

import style from './generic-modal.sass';
import RequestDocumentModalContent from 'containers/cr-page/request-document-modal-container';
import NewDocumentNotificationModalContent from 'containers/cr-page/new-document-notifications-modal-container';
import RequestTRRDocumentModalContent from 'containers/trr-page/request-document-modal-container';
import LegalDisclaimerModalContent from './legal-disclaimer-modal-content';
import scrollbarWidth from 'utils/scrollbar-width';

const contentMappings = {
  REQUEST_DOCUMENT: RequestDocumentModalContent,
  NEW_DOCUMENT_NOTIFICATIONS: NewDocumentNotificationModalContent,
  REQUEST_TRR_DOCUMENT: RequestTRRDocumentModalContent,
  LEGAL_DISCLAIMER: LegalDisclaimerModalContent
};

class GenericModal extends React.Component {
  preventCloseModal(e) {
    // Stop onClick event from bubbling up to the overlay, whose onClick handler
    // will close the modal.
    e.stopPropagation();
  }

  render() {
    const { activeModal, closeModal, location } = this.props;

    if (!activeModal) {
      return <Style scopeSelector='body' rules={ { overflowY: 'scroll' } } />;
    }

    // Disable vertical scrolling and add padding in place of the vertical scrollbar to
    // prevent the page's content from shifting horizontally:
    const bodyStyleRules = { overflowY: 'hidden', paddingRight: `${scrollbarWidth}px` };
    const ContentClass = contentMappings[activeModal];

    return (
      <div className={ style.genericModal } onClick={ closeModal }>
        <div className='generic-modal-content' onClick={ this.preventCloseModal }>
          <ContentClass closeModal={ closeModal } location={ location } />
        </div>
        <Style scopeSelector='body' rules={ bodyStyleRules } />
      </div>
    );
  }
}

GenericModal.propTypes = {
  activeModal: PropTypes.string,
  closeModal: PropTypes.func,
  location: PropTypes.object
};

export default GenericModal;
