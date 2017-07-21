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
    searchTrackingPage.trackingTable.cellAt(1, 'Last Entered').getText().should.equal('10:53 am, 22 Jun 2017');
  });

  it('should toggle sort order when clicking on table header', function () {
    searchTrackingPage.trackingTable.cellAt(1, 'Query').getText().should.equal('Ke');
    searchTrackingPage.trackingTable.header('Query').click();
    searchTrackingPage.trackingTable.cellAt(1, 'Query').getText().should.equal('Ab');
  });

  it('should load more search tracking', function () {
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
  });

  it('should show only freeText results when filtering by freeText', function () {
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
    searchTrackingPage.filterBar.freeTextButton.click();
    searchTrackingPage.trackingTable.numOfRows().should.equal(1);
  });

  it('should all results when filtering by freeText and noInteraction', function () {
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
    searchTrackingPage.filterBar.freeTextButton.click();
    searchTrackingPage.trackingTable.numOfRows().should.equal(1);
    searchTrackingPage.filterBar.noInteractionButton.click();
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
  });

  it('should all results when selecting and then deselecting freeText filter', function () {
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
    searchTrackingPage.filterBar.freeTextButton.click();
    searchTrackingPage.trackingTable.numOfRows().should.equal(1);
    searchTrackingPage.filterBar.freeTextButton.click();
    searchTrackingPage.trackingTable.cellAt(3, 'Query').waitForVisible();
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
  });

  it('should show results match to entered search term', function () {
    searchTrackingPage.trackingTable.numOfRows().should.equal(3);
    searchTrackingPage.filterBar.searchInput.setValue('A');
    searchTrackingPage.trackingTable.cellAt(1, 'Query').getText().should.equal('Ab');
    searchTrackingPage.trackingTable.cellAt(1, 'Usage(s)').getText().should.equal('2');
    searchTrackingPage.trackingTable.cellAt(1, 'Result(s)').getText().should.equal('0');
    searchTrackingPage.trackingTable.cellAt(1, 'Last Entered').getText().should.equal('10:53 am, 22 Jun 2017');
    searchTrackingPage.trackingTable.numOfRows().should.equal(1);
  });
});
