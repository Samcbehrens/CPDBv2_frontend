import { each } from 'lodash';

import Page from './page';
import Section from './sections/section';


class Menu extends Section {
  resolving = new ResolvingMenuItem();
  matching = new MatchingMenuItem();
}


class ResolvingMenuItem extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      element: '.test--merging-menu-item',
      officer: '.test--merging-officer-button'
    });
  }
}


class MatchingMenuItem extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      element: '.test--matching-menu-item',
      officer: '.test--matching-officer-button'
    });
  }
}

class RecordSection extends Section {
  constructor() {
    super();

    const infoFields = ['firstName', 'lastName', 'middleInitial', 'race', 'gender', 'onDuty', 'appointedDate'];
    const testClassNames = ['first-name', 'last-name', 'middle-initial', 'race', 'gender', 'on-duty', 'appointed-date'];
    const parentSelector = '//*[contains(@class, "test--record")]';
    const recordInfos = {};

    each(infoFields, (field, index) => {
      recordInfos[`${field}Label`] =
        `${parentSelector}//div[contains(@class, "test--${testClassNames[index]}")]//label`;
      recordInfos[`${field}Value`] =
        `${parentSelector}//div[contains(@class, "test--${testClassNames[index]}")]//input`;
    });

    this.prepareElementGetters({
      ...recordInfos,
      offset: '//*[contains(@class, "test--offset")]',
      nextButton: '//*[contains(@class, "test--next-button")]',
      previousButton: '//*[contains(@class, "test--previous-button")]'
    });
  }
}

class CandidateSection extends Section {
  constructor(selector) {
    super();

    const infoFields = ['firstName', 'lastName', 'middleInitial', 'race', 'gender', 'onDuty', 'appointedDate'];
    const testClassNames = ['first-name', 'last-name', 'middle-initial', 'race', 'gender', 'on-duty', 'appointed-date'];
    const parentSelector = '//*[contains(@class, "test--candidate")]';
    const recordInfos = {};

    each(infoFields, (field, index) => {
      recordInfos[`${field}Label`] =
        `${parentSelector}//div[contains(@class, "test--${testClassNames[index]}")]//label`;
      recordInfos[`${field}Value`] =
        `${parentSelector}//div[contains(@class, "test--${testClassNames[index]}")]//input`;
    });

    this.prepareElementGetters({
      ...recordInfos,
      selectCandidateButton: '//*[contains(@class, "test--select-candidate-button")]'
    });
  }
}


class MatchingPage extends Page {
  menu = new Menu();
  recordSection = new RecordSection();
  candidateSection = new CandidateSection();

  constructor() {
    super();
    this.prepareElementGetters({
      matchingText: '.test--matching-text',
      searchBox: '.test--search-box',
      candidate: '.test--candidate',
      record: '.test--record'
    });
  }

  open() {
    super.open('/resolving/officer-matching/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new MatchingPage();
