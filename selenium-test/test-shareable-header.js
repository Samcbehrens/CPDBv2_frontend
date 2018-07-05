'use strict';

require('should');

import landingPage from './page-objects/landing-page';
import searchPage from './page-objects/search-page';
import searchTermsPage from './page-objects/search-terms-page';
import trrPage from './page-objects/trr-page';
import header from './page-objects/shareable-header';
import officerPage from './page-objects/officer-page';


describe('shareableHeader', function () {
  describe('breadCrumbs', function () {
    it('should show the correct path', function () {
      landingPage.open();
      browser.keys('ke');

      searchPage.input.waitForVisible();
      searchPage.firstOfficerResult.waitForVisible();
      searchPage.firstOfficerResult.click();
      browser.keys('Enter');
      header.breadcrumbs.mainElement.waitForVisible();

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);

      header.breadcrumbs.mainElement.getText().should.eql('cpdpSearchBernadette Kelly');
    });

    it('should show breadcrumbs correctly when entering the Search Terms page first', function () {
      searchTermsPage.open();
      searchTermsPage.searchTermsToggle.click();
      searchPage.input.waitForVisible();
      browser.keys('ke');
      searchPage.firstOfficerResult.waitForVisible();

      browser.keys('ArrowDown');
      browser.pause(200);
      browser.keys('Enter');

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(3);
      header.breadcrumbs.mainElement.getText().should.eql('cpdpSearchBernadette Kelly');
    });

    it('should show breadcrumbs correctly when entering the TRR page first', function () {
      trrPage.open();

      const BreadcrumbsItems = header.breadcrumbs.items;
      BreadcrumbsItems.count.should.eql(2);
      header.breadcrumbs.mainElement.getText().should.eql('cpdpTRR 1');
    });

    it(
      'should show breadcrumb Officer > TRR when click TRR row through officer timeline',
      function () {
        officerPage.open();
        officerPage.tabbedPaneSection.timelineSection.filter.button.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.filter.button.click();
        officerPage.tabbedPaneSection.timelineSection.filter.force.click();

        officerPage.tabbedPaneSection.timelineSection.trrItem.waitForVisible();
        officerPage.tabbedPaneSection.timelineSection.trrItem.click();

        trrPage.title.waitForVisible();

        const BreadcrumbsItems = header.breadcrumbs.items;
        BreadcrumbsItems.count.should.eql(3);
        header.breadcrumbs.mainElement.getText().should.eql('cpdpBernadette KellyTRR 1');
      }
    );
  });
});
