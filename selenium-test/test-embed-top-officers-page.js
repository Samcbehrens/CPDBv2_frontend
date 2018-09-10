'use strict';

import should from 'should';

import embedTopOfficersPage from './page-objects/embed-top-officers-page';
import { switchToRecentTab } from './utils';


should.config.checkProtoEql = false;

describe('embed top officers page', function () {
  beforeEach(function () {
    embedTopOfficersPage.open();
    browser.pause(500);
  });

  describe('Officers By Allegation carousel', function () {
    it('should show initial carousel', function () {
      embedTopOfficersPage.officersByAllegationCarousel.cards.count.should.equal(48);
      embedTopOfficersPage.officersByAllegationCarousel.rightArrow.waitForVisible();
      embedTopOfficersPage.officersByAllegationCarousel.leftArrow.waitForVisible(2000, true);
    });

    it('should go to officer summary page when click to card', function () {
      const firstCard = embedTopOfficersPage.officersByAllegationCarousel.cards;
      firstCard.click();
      switchToRecentTab();
      browser.getUrl().should.match(/\/officer\/\d+\/[\-a-z]+\/?$/);
    });
  });
});
