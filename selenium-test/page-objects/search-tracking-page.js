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

class SearchTrakingPage extends Page {
  trackingTable = new TrackingTable()

  open() {
    super.open('/resolving/search-tracking/');
    browser.element('body').waitForVisible();
  }
}

module.exports = new SearchTrakingPage();
