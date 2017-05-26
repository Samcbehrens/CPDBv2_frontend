'use strict';

require('should');

import mergingPage from './page-objects/merging-page';


describe('merging page', function () {

  beforeEach(function () {
    mergingPage.open();
  });

  it('should display data properly', function () {
    mergingPage.mergingText.waitForVisible();
    mergingPage.searchBox.waitForVisible();
    mergingPage.record.waitForVisible();
    mergingPage.record.count.should.be.equal(1);
    mergingPage.candidate.waitForVisible();
    mergingPage.candidate.count.should.be.equal(1);
  });

  it('should display candidate information', function () {
    mergingPage.recordSection.firstNameLabel.getText().should.be.equal('First Name');
    mergingPage.recordSection.firstNameValue.getValue().should.be.equal('Pamelia');

    mergingPage.recordSection.lastNameLabel.getText().should.be.equal('Last Name');
    mergingPage.recordSection.lastNameValue.getValue().should.be.equal('Bahringer');

    mergingPage.recordSection.middleInitialLabel.getText().should.be.equal('Middle Initial');
    mergingPage.recordSection.middleInitialValue.getValue().should.be.equal('M');

    mergingPage.recordSection.raceLabel.getText().should.be.equal('Race');
    mergingPage.recordSection.raceValue.getValue().should.be.equal('White');

    mergingPage.recordSection.genderLabel.getText().should.be.equal('Gender');
    mergingPage.recordSection.genderValue.getValue().should.be.equal('F');

    mergingPage.recordSection.activeLabel.getText().should.be.equal('Active');
    mergingPage.recordSection.activeValue.isSelected().should.be.false();

    mergingPage.recordSection.appointedDateLabel.getText().should.be.equal('Appointed Date');
    mergingPage.recordSection.appointedDateValue.getValue().should.be.equal('2008-11-04');
  });

  it('should display record information', function () {
    mergingPage.candidateSection.firstNameLabel.getText().should.be.equal('First Name');
    mergingPage.candidateSection.firstNameValue.getValue().should.be.equal('Pamelia');

    mergingPage.candidateSection.lastNameLabel.getText().should.be.equal('Last Name');
    mergingPage.candidateSection.lastNameValue.getValue().should.be.equal('Bahringer');

    mergingPage.candidateSection.middleInitialLabel.getText().should.be.equal('Middle Initial');
    mergingPage.candidateSection.middleInitialValue.getValue().should.be.equal('M');

    mergingPage.candidateSection.raceLabel.getText().should.be.equal('Race');
    mergingPage.candidateSection.raceValue.getValue().should.be.equal('White');

    mergingPage.candidateSection.genderLabel.getText().should.be.equal('Gender');
    mergingPage.candidateSection.genderValue.getValue().should.be.equal('F');

    mergingPage.candidateSection.activeLabel.getText().should.be.equal('Active');
    mergingPage.candidateSection.activeValue.isSelected().should.be.true();

    mergingPage.candidateSection.appointedDateLabel.getText().should.be.equal('Appointed Date');
    mergingPage.candidateSection.appointedDateValue.getValue().should.be.equal('2007-11-04');
  });

  it('should navigate to next/previous record when we click on next/previous navigation', function () {
    mergingPage.recordSection.offset.getText().should.be.equal('1/2');
    mergingPage.recordSection.nextButton.click();
    mergingPage.recordSection.offset.getText().should.be.equal('2/2');
    mergingPage.recordSection.previousButton.click();
    mergingPage.recordSection.offset.getText().should.be.equal('1/2');
  });

  it('should update record number after merge successfully', function () {
    // go to the second unmatchable
    mergingPage.recordSection.nextButton.click();
    mergingPage.recordSection.offset.getText().should.be.equal('2/2');

    // approve the candidate
    mergingPage.candidateSection.mergeButton.click();

    // page should be reload
    mergingPage.recordSection.offset.getText().should.be.equal('1/1');
  });
});
