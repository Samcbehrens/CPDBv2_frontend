import filter from 'reducers/officer-page/new-timeline/filter';
import { OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER, CHANGE_OFFICER_ID } from 'utils/constants';


describe('filter reducer', function () {
  it('should have initial state', function () {
    filter(undefined, {}).should.eql('COMPLAINTS');
  });

  it('should handle OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER', function () {
    filter('ALL EVENTS', {
      type: OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER,
      payload: 'COMPLAINTS'
    }).should.eql('COMPLAINTS');
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    filter('SHOWING', {
      type: CHANGE_OFFICER_ID,
      payload: 123
    }).should.eql('COMPLAINTS');
  });
});
