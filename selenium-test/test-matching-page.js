'use strict';

require('should');

import matchingPage from './page-objects/matching-page';


describe('matching page', function () {

  beforeEach(function () {
    matchingPage.open();
  });

  it('should toggle displaying Officer section in menu', function () {
    matchingPage.menu.resolving.officer.waitForVisible(2000, true);
    matchingPage.menu.resolving.element.click();
    matchingPage.menu.resolving.officer.waitForVisible();
    matchingPage.menu.resolving.element.click();
    matchingPage.menu.resolving.officer.waitForVisible(2000, true);

    matchingPage.menu.matching.officer.waitForVisible(2000, true);
    matchingPage.menu.matching.element.click();
    matchingPage.menu.matching.officer.waitForVisible();
    matchingPage.menu.matching.element.click();
    matchingPage.menu.matching.officer.waitForVisible(2000, true);
  });

  it('should display data properly', function () {
    matchingPage.matchingText.waitForVisible();
    matchingPage.searchBox.waitForVisible();
    matchingPage.record.waitForVisible();
    matchingPage.record.count.should.be.equal(1);
    matchingPage.candidate.waitForVisible();
    matchingPage.candidate.count.should.be.equal(1);
  });

  it('should display record information', function () {
    matchingPage.recordSection.firstNameLabel.getText().should.be.equal('First Name');
    matchingPage.recordSection.firstNameValue.getValue().should.be.equal('Pamelia');

    matchingPage.recordSection.lastNameLabel.getText().should.be.equal('Last Name');
    matchingPage.recordSection.lastNameValue.getValue().should.be.equal('Bahringer');

    matchingPage.recordSection.middleInitialLabel.getText().should.be.equal('Middle Initial');
    matchingPage.recordSection.middleInitialValue.getValue().should.be.equal('M');

    matchingPage.recordSection.raceLabel.getText().should.be.equal('Race');
    matchingPage.recordSection.raceValue.getValue().should.be.equal('White');

    matchingPage.recordSection.genderLabel.getText().should.be.equal('Gender');
    matchingPage.recordSection.genderValue.getValue().should.be.equal('F');

    matchingPage.recordSection.activeLabel.getText().should.be.equal('Active');
    matchingPage.recordSection.activeValue.isSelected().should.be.false();

    matchingPage.recordSection.appointedDateLabel.getText().should.be.equal('Appointed Date');
    matchingPage.recordSection.appointedDateValue.getValue().should.be.equal('2008-11-04');
  });

  it('should display candidate information', function () {
    matchingPage.candidateSection.firstNameLabel.getText().should.be.equal('First Name');
    matchingPage.candidateSection.firstNameValue.getValue().should.be.equal('Pamelia');

    matchingPage.candidateSection.lastNameLabel.getText().should.be.equal('Last Name');
    matchingPage.candidateSection.lastNameValue.getValue().should.be.equal('Bahringer');

    matchingPage.candidateSection.middleInitialLabel.getText().should.be.equal('Middle Initial');
    matchingPage.candidateSection.middleInitialValue.getValue().should.be.equal('M');

    matchingPage.candidateSection.raceLabel.getText().should.be.equal('Race');
    matchingPage.candidateSection.raceValue.getValue().should.be.equal('White');

    matchingPage.candidateSection.genderLabel.getText().should.be.equal('Gender');
    matchingPage.candidateSection.genderValue.getValue().should.be.equal('F');

    matchingPage.candidateSection.activeLabel.getText().should.be.equal('Active');
    matchingPage.candidateSection.activeValue.isSelected().should.be.true();

    matchingPage.candidateSection.appointedDateLabel.getText().should.be.equal('Appointed Date');
    matchingPage.candidateSection.appointedDateValue.getValue().should.be.equal('2007-11-04');
  });

  it('should navigate to next/previous record when we click on next/previous navigation', function () {
    matchingPage.recordSection.offset.getText().should.be.equal('1/2');
    matchingPage.recordSection.nextButton.click();
    matchingPage.recordSection.offset.getText().should.be.equal('2/2');
    matchingPage.recordSection.previousButton.click();
    matchingPage.recordSection.offset.getText().should.be.equal('1/2');
  });

  it('should update record when we click on candidate\'s approve button', function () {
    // go to the second unmatchable
    matchingPage.recordSection.nextButton.click();
    matchingPage.recordSection.offset.getText().should.be.equal('2/2');

    // approve the candidate
    matchingPage.candidateSection.selectCandidateButton.click();
    // page should be reload
    matchingPage.recordSection.offset.getText().should.be.equal('1/1');
  });
});
