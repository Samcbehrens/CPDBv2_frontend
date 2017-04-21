'use strict';

require('should');

import matchingPage from './page-objects/matching-page';


describe('matching page', function () {

  beforeEach(function () {
    matchingPage.open();
  });

  it('should toggle displaying Officer section in Resolving menu', function () {
    matchingPage.menu.resolving.officer.waitForVisible();
    matchingPage.menu.resolving.element.click();
    matchingPage.menu.resolving.officer.waitForVisible(2000, true);
    matchingPage.menu.resolving.element.click();
    matchingPage.menu.resolving.officer.waitForVisible();
  });

  it('should display data properly', function () {
    matchingPage.resolvingText.waitForVisible();
    matchingPage.searchBox.waitForVisible();
    matchingPage.candidate.waitForVisible();
    matchingPage.record.waitForVisible();
    matchingPage.record.count().should.be.equal(1);
  });

//   it('should display candidate information', function () {
//     matchingPage.candidate.firstNameLabel.getText().should.be.equal('First Name');
//     matchingPage.candidate.firstNameValue.getText().should.be.equal('Aaron');
//
//     matchingPage.candidate.lastNameLabel.getText().should.be.equal('Last Name');
//     matchingPage.candidate.lastNameValue.getText().should.be.equal('Jeffery');
//
//     matchingPage.candidate.middleInitialLabel.getText().should.be.equal('Middle Initial');
//     matchingPage.candidate.middleInitialValue.getText().should.be.equal('M');
//
//     matchingPage.candidate.raceLabel.getText().should.be.equal('Middle Initial');
//     matchingPage.candidate.raceValue.getText().should.be.equal('M');
//   });
//
//   it('should display record information', function () {
//
//   });
//
//   it('should navigate to next record when we click on next navigation', function () {});
//   it('should navigate to previous record when we click on previous navigation', function () {});
//   it('should update record when we click on candidate\'s approve button', function () {});
//   it('should allow to edit record field', function () {});
});
