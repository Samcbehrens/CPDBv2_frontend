import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { FAQ_PATH } from 'utils/constants';
import { SlimHeader } from 'components/headers/slim-header';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass, Simulate
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { Link } from 'react-router';
import MockStore from 'redux-mock-store';
import ContextWrapper from 'utils/test/components/context-wrapper';
import { stub, spy } from 'sinon';
import {
  bottomLeftLinkStyle, bottomRightLinkStyle,
  bottomSlimHeaderStyle, bottomSubtitleStyle,
  middleLeftLinkStyle, middleRightLinkStyle,
  middleSlimHeaderStyle, middleSubtitleStyle, topLeftLinkStyle, topRightLinkStyle,
  topSlimHeaderStyle, topSubtitleStyle
} from 'components/headers/slim-header.style';
import { scrollToTop } from 'utils/dom';
import {
  bottomSearchBoxStyle, middleSearchBoxStyle,
  topSearchBoxStyle
} from 'components/landing-page/search-section/search-section.style';
import { accentColor, clayGray } from 'utils/styles';

class SlimHeaderContextWrapper extends ContextWrapper {
}

SlimHeaderContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('SlimHeader component', function () {
  let element;
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {}
  });


  beforeEach(function () {
    window.scrollTo(0, 0);
    stub(window, 'addEventListener');
    stub(window, 'removeEventListener');
  });

  afterEach(function () {
    window.addEventListener.restore();
    window.removeEventListener.restore();
    unmountComponentSuppressError(element);
  });

  it('should render nothing if "show" prop is false', function () {
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ false } />
        </SlimHeaderContextWrapper>
      </Provider>
    );
    scryRenderedDOMComponentsWithClass(element, 'test--slim-header').length.should.eql(0);
  });

  it('should render FAQ link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedComponentsWithType(element, Link);
    const link = links.filter(link => link.props.children === 'FAQ')[0];
    link.props.to.should.eql('/' + FAQ_PATH);
  });

  it('should render Data link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedDOMComponentsWithTag(element, 'a');
    const link = links.filter(link => link.textContent === 'Data')[0];
    link.getAttribute('href').should.eql('https://beta.cpdb.co/');
  });

  it('should render Glossary link', function () {
    const openRequestDocumentModal = spy();
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } openLegalDisclaimerModal={ openRequestDocumentModal } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const links = scryRenderedDOMComponentsWithTag(element, 'a');
    const link = links.filter(link => link.textContent === 'Glossary')[0];
    link.getAttribute('href').should.eql('https://beta.cpdb.co/glossary/');
  });

  it('should show correct style by default', function () {
    element = renderIntoDocument(
      <Provider store={ store }>
        <SlimHeaderContextWrapper context={ { editModeOn: false } }>
          <SlimHeader show={ true } pathname='/' />
        </SlimHeaderContextWrapper>
      </Provider>
    );

    const slimHeader = findRenderedComponentWithType(element, SlimHeader);

    slimHeader.state.slimHeaderStyle.should.eql(topSlimHeaderStyle);
    slimHeader.state.leftLinkStyle.should.eql(topLeftLinkStyle);
    slimHeader.state.rightLinkStyle.should.eql(topRightLinkStyle);
    slimHeader.state.subtitleStyle.should.eql(topSubtitleStyle);
    slimHeader.state.subtitleStyle.should.eql(topSubtitleStyle);
    slimHeader.state.searchBoxStyle.should.eql(topSearchBoxStyle);
    slimHeader.state.magnifyingGlassColor.should.eql(accentColor);
    slimHeader.state.handleOnClick.should.not.eql(scrollToTop);
  });

  describe('handleStateChange', function () {
    beforeEach(function () {
      element = renderIntoDocument(
        <Provider store={ store }>
          <SlimHeaderContextWrapper context={ { editModeOn: false } }>
            <SlimHeader show={ true } pathname='/' />
          </SlimHeaderContextWrapper>
        </Provider>
      );

      this.slimHeader = findRenderedComponentWithType(element, SlimHeader);

      // Clear default styling to make sure they will be actually set by handleStateChange():
      this.slimHeader.setState({
        slimHeaderStyle: {},
        leftLinkStyle: {},
        rightLinkStyle: {},
        handleOnClick: () => {},
        subtitleStyle: {},
      });
    });

    it('should set top header style when sticky', function () {
      this.slimHeader.handleStateChange(false);
      this.slimHeader.state.slimHeaderStyle.should.eql(topSlimHeaderStyle);
      this.slimHeader.state.leftLinkStyle.should.eql(topLeftLinkStyle);
      this.slimHeader.state.rightLinkStyle.should.eql(topRightLinkStyle);
      this.slimHeader.state.subtitleStyle.should.eql(topSubtitleStyle);
      this.slimHeader.state.searchBoxStyle.should.eql(topSearchBoxStyle);
      this.slimHeader.state.magnifyingGlassColor.should.eql(accentColor);
      this.slimHeader.state.handleOnClick.should.not.eql(scrollToTop);
    });

    it('should set middle header style when sticky but not yet at bottom', function () {
      this.slimHeader.handleStateChange(true, false);
      this.slimHeader.state.slimHeaderStyle.should.eql(middleSlimHeaderStyle);
      this.slimHeader.state.leftLinkStyle.should.eql(middleLeftLinkStyle);
      this.slimHeader.state.rightLinkStyle.should.eql(middleRightLinkStyle);
      this.slimHeader.state.subtitleStyle.should.eql(middleSubtitleStyle);
      this.slimHeader.state.searchBoxStyle.should.eql(middleSearchBoxStyle);
      this.slimHeader.state.magnifyingGlassColor.should.eql(clayGray);
      this.slimHeader.state.handleOnClick.should.not.eql(scrollToTop);
    });

    it('should set bottom header style when at bottom', function () {
      this.slimHeader.handleStateChange(true, true);
      this.slimHeader.state.slimHeaderStyle.should.eql(bottomSlimHeaderStyle);
      this.slimHeader.state.leftLinkStyle.should.eql(bottomLeftLinkStyle);
      this.slimHeader.state.rightLinkStyle.should.eql(bottomRightLinkStyle);
      this.slimHeader.state.subtitleStyle.should.eql(bottomSubtitleStyle);
      this.slimHeader.state.searchBoxStyle.should.eql(bottomSearchBoxStyle);
      this.slimHeader.state.magnifyingGlassColor.should.eql('white');
      this.slimHeader.state.handleOnClick.should.eql(scrollToTop);
    });
  });

  describe('External links', function () {
    it('should stopPropagation when being clicked', function () {
      element = renderIntoDocument(
        <Provider store={ store }>
          <SlimHeaderContextWrapper context={ { editModeOn: false } }>
            <SlimHeader show={ true } pathname='/' />
          </SlimHeaderContextWrapper>
        </Provider>
      );
      let externalLinks = scryRenderedDOMComponentsWithClass(element, 'test--right-external-link');
      const dummyEvent = {
        stopPropagation: spy()
      };
      Simulate.click(externalLinks[0], dummyEvent);
      dummyEvent.stopPropagation.called.should.be.true();
    });
  });
});
