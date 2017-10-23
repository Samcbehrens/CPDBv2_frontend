'use strict';

import 'should';

import timelinePage from './page-objects/officer-timeline-page';
import searchPage from './page-objects/search-page';
import crPage from './page-objects/cr-page';
import { getRequestCount } from './utils';


describe('officer timeline page', function () {
  beforeEach(function () {
    timelinePage.open(1);
  });
  it('should show minimap', function () {
    // timelinePage.sidebar.filterButton.waitForVisible();
    // timelinePage.sidebar.sortButton.waitForVisible();
    timelinePage.sidebar.yearLabel.waitForVisible();

    timelinePage.sidebar.yearLabel.count.should.equal(5);
    timelinePage.sidebar.yearLabel.getText().should.equal('2005');

    timelinePage.sidebar.minimapItem.waitForVisible();
    timelinePage.sidebar.minimapItem.count.should.equal(10);
    timelinePage.sidebar.minimapItem.getText().should.equal('CR');
  });

  it('should show timeline', function () {
    timelinePage.timeline.element.waitForVisible();
  });

  it('should show officer name on header when first loaded', function () {
    timelinePage.header.officerName.getText().should.equal('Bernadette Kelly');
  });

  it('should highlight timeline header button', function () {
    timelinePage.header.activeButton.waitForVisible();
    timelinePage.header.activeButton.getText().should.equal('Timeline');
  });

  it('should refresh timeline as well as minimap when visit other officers', function () {
    timelinePage.open(1234);
    timelinePage.sidebar.yearLabel.count.should.equal(1);
    timelinePage.timeline.cardItem.count.should.equal(2);

    timelinePage.bottomSheet.clickOverlay();

    searchPage.input.waitForVisible();
    searchPage.input.setValue('foo');

    searchPage.firstOfficerResult.waitForVisible();
    searchPage.firstOfficerResult.click();

    timelinePage.header.timelineButton.waitForVisible();
    timelinePage.header.timelineButton.click();

    timelinePage.sidebar.yearLabel.count.should.equal(0);
    timelinePage.timeline.cardItem.count.should.equal(0);
  });

  it('should launch timeline, summary, minimap requests upon direct visit', function () {
    getRequestCount('/officers/1/timeline-items/').should.equal(1);
    getRequestCount('/officers/1/summary/').should.equal(1);
    getRequestCount('/officers/1/timeline-minimap/').should.equal(1);
  });

  it('should not launch any request when click on Summary tab', function () {
    timelinePage.header.summaryButton.waitForVisible();
    timelinePage.header.summaryButton.click();

    getRequestCount('/officers/1/timeline-items/').should.equal(1);
    getRequestCount('/officers/1/summary/').should.equal(1);
    getRequestCount('/officers/1/timeline-minimap/').should.equal(1);
  });

  // it('should preserve sort order when click other tabs', function () {
  //   timelinePage.sidebar.sortButton.getText().should.equal('Sort by oldest first');
  //
  //   timelinePage.sidebar.sortButton.click();
  //   timelinePage.header.summaryButton.click();
  //   timelinePage.header.timelineButton.click();
  //
  //   timelinePage.sidebar.sortButton.getText().should.equal('Sort by newest first');
  // });
  //
  // it('should reset sort order when visit other officer', function () {
  //   timelinePage.sidebar.sortButton.waitForVisible();
  //   timelinePage.sidebar.sortButton.click();
  //   timelinePage.sidebar.sortButton.getText().should.equal('Sort by newest first');
  //
  //   timelinePage.bottomSheet.clickOverlay();
  //
  //   searchPage.input.waitForVisible();
  //   searchPage.input.setValue('foo');
  //
  //   searchPage.firstOfficerResult.waitForVisible();
  //   searchPage.firstOfficerResult.click();
  //
  //   timelinePage.header.timelineButton.waitForVisible();
  //   timelinePage.header.timelineButton.click();
  //
  //   timelinePage.sidebar.sortButton.getText().should.equal('Sort by oldest first');
  // });

  it('should change selected minimap item when going back from CR page', function () {
    timelinePage.sidebar.clickOn('2005', 1);
    timelinePage.timeline.cardItemAtIndex(5).click();
    crPage.element.waitForVisible();
    browser.back();
    timelinePage.sidebar.itemAt('2004', 1).getCssProperty('backgroundColor').value.should.equal(
      'rgba(255,255,255,1)'
    );
  });

  describe('minimap', function () {
    it('should highlight corresponding timeline item when hovered on', function () {
      timelinePage.sidebar.yearLabel.waitForVisible();
      timelinePage.sidebar.minimapItem.waitForVisible();
      timelinePage.sidebar.hoverOn('2005', 1);
      timelinePage.timeline.cardItemAtIndex(2).getCssProperty('backgroundColor').value.should.equal(
        'rgba(255,255,255,1)'
      );
    });

    it('should scroll to corresponding timeline item when clicked on', function () {
      timelinePage.timeline.cardItem.count.should.equal(10);
      timelinePage.timeline.joinedItem.kind.isVisible().should.be.false();
      timelinePage.sidebar.clickOn('2001', 2);
      timelinePage.timeline.joinedItem.kind.waitForVisible();
      timelinePage.timeline.joinedItem.kind.getText().should.equal('Joined');
      timelinePage.timeline.joinedItem.date.getText().should.equal('DEC 5, 2001');
      timelinePage.timeline.joinedItem.description.getText().should.equal('Joined CPD');
    });

    // it('should change sort button text when click on', function () {
    //   timelinePage.sidebar.sortButton.waitForVisible();
    //   timelinePage.sidebar.sortButton.getText().should.equal('Sort by oldest first');
    //   timelinePage.sidebar.sortButton.click();
    //   timelinePage.sidebar.sortButton.getText().should.equal('Sort by newest first');
    // });

    it('should highlight selected item', function () {
      timelinePage.sidebar.clickOn('2005', 1);
      timelinePage.sidebar.itemAt('2005', 1).getCssProperty('backgroundColor').value.should.equal(
        'rgba(255,255,255,1)'
      );
    });

    // it('should remove highlight for selected item when change sort order', function () {
    //   timelinePage.sidebar.clickOn('2005', 1);
    //   timelinePage.sidebar.itemAt('2005', 1).getCssProperty('backgroundColor').value.should.equal(
    //     'rgba(255,255,255,1)'
    //   );
    //   timelinePage.sidebar.sortButton.click();
    //   timelinePage.sidebar.itemAt('2005', 1).getCssProperty('backgroundColor').value.should.equal(
    //     'rgba(244,244,244,1)'
    //   );
    // });
  });

  describe('timeline', function () {
    it('should show timeline items', function () {
      timelinePage.timeline.cardItem.count.should.equal(10);

      timelinePage.timeline.yearItem.year.getText().should.equal('2005');
      timelinePage.timeline.yearItem.crsLabel.getText().should.equal('CRs');
      timelinePage.timeline.yearItem.crsValue.getText().should.equal('1');
      timelinePage.timeline.yearItem.trrsLabel.getText().should.equal('TRRs');
      timelinePage.timeline.yearItem.trrsValue.getText().should.equal('0');
      timelinePage.timeline.yearItem.salaryLabel.getText().should.equal('Salary');
      timelinePage.timeline.yearItem.salaryValue.getText().should.equal('Data not available');

      timelinePage.timeline.crItem.date.getText().should.equal('NOV 28, 2005');
      timelinePage.timeline.crItem.crid.getText().should.equal('CR 968734');
      timelinePage.timeline.crItem.category.getText().should.equal('Use of Force');
      timelinePage.timeline.crItem.subcategory.getText().should.equal('EXCESSIVE FORCE - OFF DUTY');
      timelinePage.timeline.crItem.finding.getText().should.equal('Unfounded');
      timelinePage.timeline.crItem.coaccused.getText().should.equal('1 of 1 Coaccused');

      timelinePage.timeline.unitItem.kind.getText().should.equal('Unit Change');
      timelinePage.timeline.unitItem.date.getText().should.equal('APR 28, 2005');
      timelinePage.timeline.unitItem.description.getText().should.equal('Assigned to Unit 004');
    });

    // it('should refresh items when change sort order', function () {
    //   timelinePage.timeline.joinedItem.kind.isVisible().should.be.false();
    //
    //   timelinePage.sidebar.sortButton.waitForVisible();
    //   timelinePage.sidebar.sortButton.click();
    //
    //   timelinePage.timeline.joinedItem.kind.waitForVisible();
    //   timelinePage.timeline.joinedItem.kind.getText().should.equal('Joined');
    //   timelinePage.timeline.joinedItem.date.getText().should.equal('DEC 5, 2001');
    //   timelinePage.timeline.joinedItem.description.getText().should.equal('Joined CPD');
    // });

    it('should highlight corresponding minimap item when hovered on', function () {
      timelinePage.timeline.hoverOn(2);
      timelinePage.sidebar.itemAt('2005', 1).getCssProperty('backgroundColor').value.should.equal(
        'rgba(228,228,228,1)'
      );
    });

    it('should launch Complaint bottom sheet when click on a CR item', function () {
      timelinePage.timeline.cardItemAtIndex(2).click();
      crPage.element.waitForVisible();
      crPage.currentBasePath.should.equal('/complaint/968734/1/');
    });
  });
});

describe('Timeline page with filtered params', function () {
  beforeEach(function () {
    timelinePage.open(1, '?category=Use%20of%20Force&race=Black&invalid=xxx');
  });

  it('should show 2 filtered item and handle clear each filter', function () {

    timelinePage.sidebar.filterItem.count.should.equal(2);

    let categoryFilterLink = timelinePage.sidebar.findFilterItemRemoveBtnWithText('Use of Force');
    categoryFilterLink.waitForVisible();

    let raceFilterLink = timelinePage.sidebar.findFilterItemRemoveBtnWithText('Black');
    raceFilterLink.waitForVisible();

    timelinePage.sidebar.itemAt('2002', 2).waitForVisible(500, true);
    timelinePage.sidebar.itemAt('2003', 2).waitForVisible(500, true);
    timelinePage.timeline.element.getText().should.not.containEql('Illegal Search');
    timelinePage.timeline.element.getText().should.not.containEql('CR 123456');
    timelinePage.timeline.element.getText().should.containEql('CR 456123');
    raceFilterLink.click();

    timelinePage.sidebar.findFilterItemRemoveBtnWithText('Black').waitForVisible(500, true);
    timelinePage.sidebar.itemAt('2003', 2).waitForVisible();  // more item appear
    timelinePage.timeline.element.getText().should.not.containEql('Illegal Search');
    timelinePage.timeline.element.getText().should.containEql('CR 123456');
    timelinePage.timeline.element.getText().should.containEql('CR 456123');

    timelinePage.sidebar.findFilterItemRemoveBtnWithText('Use of Force').waitForVisible();

    categoryFilterLink.click();
    timelinePage.sidebar.findFilterItemRemoveBtnWithText('Use of Force').waitForVisible(500, true);
    timelinePage.sidebar.itemAt('2002', 2).waitForVisible();
    timelinePage.timeline.element.getText().should.containEql('CR 123456');
    timelinePage.timeline.element.getText().should.containEql('CR 456123');
  });
});
