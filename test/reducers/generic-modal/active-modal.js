import should from 'should';
import {
  OPEN_REQUEST_DOCUMENT_MODAL,
  CLOSE_MODAL,
  OPEN_LEGAL_DISCLAIMER_MODAL,
  OPEN_REQUEST_TRR_DOCUMENT_MODAL,
  OPEN_NEW_DOCUMENT_NOTIFICATIONS_MODAL
} from 'actions/generic-modal';
import activeModal from 'reducers/generic-modal/active-modal';


describe('activeModal reducer', function () {
  it('should return initial state', function () {
    should(activeModal(undefined, {})).equal(null);
  });

  it('should handle OPEN_REQUEST_DOCUMENT_MODAL', function () {
    activeModal(null, { type: OPEN_REQUEST_DOCUMENT_MODAL }).should.eql('REQUEST_DOCUMENT');
  });

  it('should handle OPEN_NEW_DOCUMENT_NOTIFICATIONS_MODAL', function () {
    activeModal(null, { type: OPEN_NEW_DOCUMENT_NOTIFICATIONS_MODAL }).should.eql('NEW_DOCUMENT_NOTIFICATIONS');
  });

  it('should handle OPEN_REQUEST_TRR_DOCUMENT_MODAL', function () {
    activeModal(null, { type: OPEN_REQUEST_TRR_DOCUMENT_MODAL }).should.eql('REQUEST_TRR_DOCUMENT');
  });

  it('should handle OPEN_LEGAL_DISCLAIMER_MODAL', function () {
    activeModal(null, { type: OPEN_LEGAL_DISCLAIMER_MODAL }).should.eql('LEGAL_DISCLAIMER');
  });

  it('should handle CLOSE_MODAL', function () {
    should(activeModal(null, { type: CLOSE_MODAL })).equal(null);
  });
});
