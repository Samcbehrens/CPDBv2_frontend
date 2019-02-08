import React from 'react';
import { findDOMNode } from 'react-dom';
import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithTag,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy, stub, useFakeTimers } from 'sinon';
import { StyleRoot } from 'radium';

import NewDocumentNotificationsModalContent from 'components/generic-modal/new-document-notifications-modal-content';
import { RawContentStateFactory } from 'utils/test/factories/draft';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


describe('NewDocumentNotificationsModalContent component', function () {
  let element;

  afterEach(function () {
    if (element) {
      unmountComponentSuppressError(element);
    }
  });

  it('should initial render form with text box and "Enter", "Cancel" button', function () {
    const instructionEditWrapperStateProps = {
      fields: {
        'new_document_notification': {
          type: 'rich_text',
          name: 'new_document_notification',
          value: RawContentStateFactory.build(
            {}, { blockTexts: ['We’ll notify you when we have new documents.'] }
          )
        }
      },
      sectionEditModeOn: false,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy()
    };
    element = renderIntoDocument(
      <NewDocumentNotificationsModalContent instructionEditWrapperStateProps={ instructionEditWrapperStateProps }/>
    );
    const domElement = findDOMNode(element);

    domElement.textContent.should.containEql('We’ll notify you when we have new documents.');
    element.state.warning.should.be.false();
    let inputDOMElements = scryRenderedDOMComponentsWithTag(element, 'input');
    inputDOMElements[0].getAttribute('placeholder').should.be.eql('Your email');
    inputDOMElements[1].getAttribute('value').should.be.eql('Request');
    findRenderedDOMComponentWithTag(element, 'a').textContent.should.be.eql('Cancel');

    const editWrapperStateProvider = findRenderedComponentWithType(element, EditWrapperStateProvider);
    const hoverableEditWrapper = findRenderedComponentWithType(editWrapperStateProvider, HoverableEditWrapper);
    const editableNoDocumentText = findRenderedComponentWithType(hoverableEditWrapper, RichTextEditable);
    editableNoDocumentText.props.fieldname.should.equal('new_document_notification');
  });

  it('should call closeEvent when click to Close link', function () {
    const cancelClickHandler = spy();
    element = renderIntoDocument(
      <NewDocumentNotificationsModalContent closeModal={ cancelClickHandler }/>
    );
    const cancelDomElement = findRenderedDOMComponentWithTag(element, 'a');
    cancelDomElement.textContent.should.be.eql('Cancel');
    Simulate.click(cancelDomElement);
    cancelClickHandler.calledOnce.should.be.true();
  });

  it('should show message if isRequested is true and have message', function () {
    element = renderIntoDocument(
      <NewDocumentNotificationsModalContent message={ 'Thanks you' } isRequested={ true } />
    );
    const messageBoxElement = findRenderedDOMComponentWithClass(element, 'new-document-notifications-message-box');
    messageBoxElement.textContent.should.be.eql('Thanks you');
  });

  it('hide messageBox on startup but show if `warning` set to true; the email-input change background', function () {
    element = renderIntoDocument(
      <NewDocumentNotificationsModalContent message={ 'Thanks you' } />
    );
    scryRenderedDOMComponentsWithClass(element, 'new-document-notifications-message-box').length.should.eql(0);
    element.setState({ warning: true });
    const messageBoxElement = findRenderedDOMComponentWithClass(element, 'new-document-notifications-message-box');
    messageBoxElement.textContent.should.eql('Thanks you');

    element.refs.email.className.should.containEql('emphasis');
  });

  describe('Submit', function () {
    let instance;
    let clock;
    let assertInCallbackTest;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
      if (instance) {
        unmountComponentSuppressError(instance);
      }
    });

    function submitNewDocumentNotificationsTest(assertInCallbackTest, done, fail=false) {
      const closeCallback = spy();
      const promise = new Promise((resolve, reject) => {
        if (fail) { reject(); }
        else { resolve(); }
      });
      let newDocumentNotificationsCallback = stub().returns(promise);
      let requestForm;

      const oldHandleSubmit = NewDocumentNotificationsModalContent.prototype.handleSubmit;
      NewDocumentNotificationsModalContent.prototype.handleSubmit = function (event) {
        event.preventDefault = spy();

        const temp = oldHandleSubmit.call(this, event);
        event.preventDefault.calledOnce.should.be.true();
        temp.then(() => {
          assertInCallbackTest(requestForm);
          NewDocumentNotificationsModalContent.prototype.handleSubmit = oldHandleSubmit;
        }).then(done);
      };

      instance = renderIntoDocument(
        <StyleRoot>
          <NewDocumentNotificationsModalContent
            message={ 'Default message' }
            id={ 1 }
            closeModal={ closeCallback }
            onRequestDocument={ newDocumentNotificationsCallback }
          />
        </StyleRoot>);

      requestForm = findRenderedComponentWithType(instance, NewDocumentNotificationsModalContent);
      requestForm.state.warning.should.be.false();
      let emailElement = requestForm.refs.email;
      emailElement.value = 'abc@xyz.com';
      Simulate.change(emailElement);
      let formElement = findRenderedDOMComponentWithTag(requestForm, 'form');
      Simulate.submit(formElement);

      newDocumentNotificationsCallback.calledWith({ id: 1, email: 'abc@xyz.com' }).should.be.true();
    }

    // TODO: BUG - when one case failed, then other case failed as well !
    it('- invalid email, should set "warning" state to true, show the messageBox', function (done) {

      assertInCallbackTest = function (requestForm) {
        requestForm.state.should.containEql( { warning: true } );

        const messageBoxElement = findRenderedDOMComponentWithClass(
          requestForm, 'new-document-notifications-message-box'
        );
        messageBoxElement.textContent.should.be.eql('Default message');
      };
      submitNewDocumentNotificationsTest(assertInCallbackTest, done, true);
    });

    it('- valid email, should set "warning" state as false and call closeModal after 1.5s', function (done) {
      assertInCallbackTest = function (requestForm) {
        requestForm.state.should.containEql( { warning: false } );
        requestForm.props.closeModal.called.should.be.false();
        clock.tick(1550);
        requestForm.props.closeModal.calledOnce.should.be.true();
      };
      submitNewDocumentNotificationsTest(assertInCallbackTest, done);
    });
  });
});
