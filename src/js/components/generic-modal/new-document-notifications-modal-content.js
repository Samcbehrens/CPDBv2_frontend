import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import ConfiguredRadium from 'utils/configured-radium';
import style from './new-document-notifications-modal-content.sass';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


class NewDocumentNotificationsModalContent extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { warning: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onRequestDocument, id, closeModal } = this.props;

    return onRequestDocument({ id, email: this.refs.email.value }).then((action) => {
      this.setState({ warning: false });
      setTimeout(closeModal, 1500);  // auto close modal if success
    }).catch(e => {
      this.setState({ warning: true });
    });
  }

  render() {
    const { closeModal, message, isRequested, instructionEditWrapperStateProps } = this.props;
    const showMessage = message && (isRequested || this.state.warning);

    return (
      <form onSubmit={ this.handleSubmit } className={ style.newDocumentNotificationsModalContent }>
        <div className='new-document-notifications-content'>
          <EditWrapperStateProvider { ...instructionEditWrapperStateProps }>
            <HoverableEditWrapper className='new-document-notifications'>
              <RichTextEditable
                placeholder='We’ll notify you when we have new documents.'
                fieldname='new_document_notification'
              />
            </HoverableEditWrapper>
          </EditWrapperStateProvider>
          <input
            ref='email'
            className={ cx('new-document-notifications-input', { emphasis: this.state.warning }) }
            placeholder='Your email'
          />
        </div>
        <input type='submit' className='new-document-notifications-submit-button' value='Request'/>
        <a className='new-document-notifications-link-button' onClick={ closeModal }>Cancel</a>
        { showMessage && <div className='new-document-notifications-message-box'>{ message }</div> }
      </form>
    );
  }
}

export default ConfiguredRadium(NewDocumentNotificationsModalContent);

NewDocumentNotificationsModalContent.propTypes = {
  onRequestDocument: PropTypes.func,
  message: PropTypes.string,
  closeModal: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isRequested: PropTypes.bool,
  instructionEditWrapperStateProps: PropTypes.object,
};
