import Page from './page';
import Section from './sections/section';
import DocumentRequestModalSection from './sections/document-request-modal';


class OfficerSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      officerName: '.test--officer-full-name',
      officerRow: '.test--trr-officer-row',
      unitLinkItem: '.test--link-item',
      officerProfileButton: ('//*[@class="test--navigation-button" and ./span/text()="View Profile"]'),
      unitProfileButton: ('//*[@class="test--navigation-button" and ./span/text()="View Unit"]')
    });
  }
}

class TRRInfoSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      documentRequestButton: '.test--attachment-request'
    });
  }
}


class TRRPage extends Page {
  officerSection = new OfficerSection();
  trrInfoSection = new TRRInfoSection();
  documentRequestModal = new DocumentRequestModalSection();

  constructor() {
    super();

    this.prepareElementGetters({
      title: '.test--trr-title',
    });
  }

  open(id=1) {
    super.open(`/trr/${id}/`);
    browser.element('body').waitForVisible();
  }
}

module.exports = new TRRPage();
