'use strict';

require('should');

import landingPage from './page-objects/landing-page';


describe('landing page', function () {

  beforeEach(function () {
    landingPage.open();
    browser.pause(500);
  });

  it('should enter edit mode when press ESCAPE', function () {
    landingPage.toggleEditMode(false);
    landingPage.currentBasePath.should.equal('/edit/');
  });

  it('should exit edit mode when press ESCAPE again', function () {
    landingPage.toggleEditMode(false);
    landingPage.toggleEditMode(true);
    landingPage.currentBasePath.should.equal('/');
  });

  it('should show login screen if not logged-in when entering edit mode', function () {
    landingPage.toggleEditMode(false);
    landingPage.loginScreen.loginModal.waitForVisible();
  });

  it('should not show login screen if already logged-in when entering edit mode', function () {
    landingPage.toggleEditMode(false);
    landingPage.loginScreen.login();

    landingPage.toggleEditMode(true);
    landingPage.toggleEditMode(false);

    browser.pause(500);
    landingPage.loginScreen.loginModal.waitForVisible(2000, true);
  });

  it('should show activity grid', function () {
    landingPage.activityGridSection.cards.count.should.equal(40);
  });

  it('should open a modal when user clicks on "Legal Disclaimer"', function () {
    landingPage.header.legalDisclaimer.click();
    landingPage.genericModalSection.overlay.waitForVisible();
    landingPage.genericModalSection.legalDisclaimerTitle.waitForVisible();

    landingPage.genericModalSection.overlay.click();
    landingPage.genericModalSection.overlay.waitForVisible(2000, true);
  });

  it('should keep the same body width when scrollbar disappears because of open modal', function () {
    const initialWidth = browser.getCssProperty('body', 'width');
    landingPage.header.legalDisclaimer.click();
    const activeWidth = browser.getCssProperty('body', 'width');
    activeWidth.should.eql(initialWidth);
  });


  describe('sticky header', function () {
    afterEach(function () {
      browser.scroll(0, 0);
    });

    it('should have blue nav links in default non-sticky state', function () {
      landingPage.header.mainElement.getCssProperty('position').value.should.eql('static');
      landingPage.header.faq.getCssProperty('color').value.should.eql('rgba(0,94,244,1)');
      landingPage.header.mainElement.getCssProperty('box-shadow').value.should.eql('none');
    });

    it('should have fixed position, grey nav links and bottom shadow in sticky state', function () {
      browser.scroll(0, 20);
      landingPage.header.mainElement.getCssProperty('position').value.should.eql('fixed');
      landingPage.header.faq.getCssProperty('color').value.should.eql('rgba(143,143,143,1)');
      landingPage.header.mainElement.getCssProperty('box-shadow').value.should.eql('rgba(0,0,0,0.13)0px1px1px0px');
    });

    it('should have blue background when scrolled all the way to bottom of page', function () {
      browser.scroll(0, 9999999);
      landingPage.header.mainElement.getCssProperty('background-color').value.should.eql('rgba(0,94,244,1)');
      landingPage.header.faq.getCssProperty('color').value.should.eql('rgba(255,255,255,1)');
      landingPage.header.mainElement.getCssProperty('box-shadow').value.should.eql('none');
    });
  });
});
