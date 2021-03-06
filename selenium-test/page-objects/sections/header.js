import Section from './section';
import RichTextToolbar from './rich-text-toolbar';


class LogoSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editButton: '.test--top-slim-header .top-button-wrapper .hoverable-edit-wrapper-button',
      saveButton: '.test--top-slim-header .bottom-button-wrapper .hoverable-edit-wrapper-button:first-child',
      cancelButton: '.test--top-slim-header .bottom-button-wrapper .hoverable-edit-wrapper-button:last-child',
      title: '.test--top-slim-header .test--header-logo-title',
      subtitle: '.test--top-slim-header .test--header-logo-subtitle',
      subtitleFirstLine: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "test--header-logo-subtitle")]',
        '//div[@data-block="true"])[1]',
      ].join(''),
      boldTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "test--header-logo-subtitle")]',
        '//span[@data-offset-key and contains(@style, "font-weight: bold;")]/span)[1]',
      ].join(''),
      italicTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "test--header-logo-subtitle")]',
        '//span[@data-offset-key and contains(@style, "font-style: italic;")]/span)[1]'
      ].join(''),
      linkTextSpan: [
        '(//div[@class="test--top-slim-header"]',
        '//div[contains(@class, "test--header-logo-subtitle")]',
        '//span[contains(@style, "text-decoration: underline;")]/span[@data-offset-key]/span)[1]'
      ].join('')
    });
  }
}

class TopHeader extends Section {
  logo = new LogoSection();
  richTextToolbar = new RichTextToolbar();

  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--top-slim-header',
      closeButtonSelector: '.test--top-slim-header .nav-link__close-btn',
      data: '//*[@class="test--top-slim-header"]//a[text()="Data"]',
      qa: '//*[@class="test--top-slim-header"]//a[text()="Q&A"]',
      glossary: '//a[text()="Glossary"]',
      logOutButton: '.test--top-slim-header .test--logout-button',
    });
  }
}

class SlimHeader extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      mainElement: '.test--sticky-slim-header',
      closeButtonSelector: '.test--sticky-slim-header .nav-link__close-btn',
      data: '//*[@class="test--sticky-slim-header"]//a[text()="Data"]',
      qa: '//*[@class="test--sticky-slim-header"]//a[text()="Q&A"]',
      glossary: '//a[text()="Glossary"]',
      logOutButton: '.test--sticky-slim-header .test--logout-button',
    });
  }
}

module.exports = {
  TopHeader,
  SlimHeader
};
