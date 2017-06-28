'use strict';

require('should');

import searchTrackingPage from './page-objects/search-tracking-page';


describe('search tracking page', function () {
  beforeEach(function () {
    searchTrackingPage.open();
  });

  it('should show tracking results', function () {
    searchTrackingPage.trackingTable.cellAt(1, 'Query').getText().should.equal('Ke');
    searchTrackingPage.trackingTable.cellAt(1, 'Usage(s)').getText().should.equal('2');
    searchTrackingPage.trackingTable.cellAt(1, 'Result(s)').getText().should.equal('22');
    searchTrackingPage.trackingTable.cellAt(1, 'Last Entered').getText().should.equal('05:53 pm, 22 Jun 2017');
  });

  it('should toggle sort order when clicking on table header', function () {
    searchTrackingPage.trackingTable.cellAt(1, 'Query').getText().should.equal('Ke');
    searchTrackingPage.trackingTable.header('Query').click();
    searchTrackingPage.trackingTable.cellAt(1, 'Query').getText().should.equal('Ab');
  });

  it('should load more search tracking', function () {
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
  });
});
