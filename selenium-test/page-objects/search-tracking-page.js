import Page from './page';
import Section from './sections/section';


class TrackingTable extends Section {
  cellAt(row, column) {
    return browser.element(`tbody tr:nth-child(${row}) td[data-th*="${column}"]`);
  }

  header(label) {
    return browser.element(`//*/thead/tr/th/button/div/span[text()="${label}"]`);
  }

  numOfRows() {
    return browser.elements('tbody tr').value.length;
  }
}


class FilterBar extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      freeTextButton: '//*/label[text()="Free Text"]',
      noInteractionButton: '//*/label[text()="No Interaction"]',
      searchInput: '//input'
    });
  }
}


class SearchTrakingPage extends Page {
  trackingTable = new TrackingTable()
  filterBar = new FilterBar()

  open() {
    super.open('/resolving/search-tracking/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SearchTrakingPage();
