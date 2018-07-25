import currentTab from 'reducers/officer-page/currentTab';

import { CHANGE_OFFICER_TAB, CHANGE_OFFICER_ID } from 'utils/constants';


describe('currentTab reducer', function () {
  it('should have initial state', function () {
    currentTab(undefined, {}).should.eql('TIMELINE');
  });

  it('should handle CHANGE_OFFICER_TAB', function () {
    currentTab(undefined, {
      type: CHANGE_OFFICER_TAB,
      payload: 'ATTACHMENTS'
    }).should.eql('ATTACHMENTS');
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    currentTab(undefined, {
      type: CHANGE_OFFICER_ID,
      payload: 'ATTACHMENTS'
    }).should.eql('TIMELINE');
  });
});
