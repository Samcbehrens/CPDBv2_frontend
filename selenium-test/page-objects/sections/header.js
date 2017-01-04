import Section from './section';


class Header extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      closeButtonSelector: '.nav-link__close-btn',
      headerLogoSelector: '.header-logo',
      reporting: '//a[text()="Reporting"]',
      faq: '//a[text()="FAQ"]',
      collaborate: '//a[text()="Collaborate"]'
    });
  }
}

module.exports = Header;
