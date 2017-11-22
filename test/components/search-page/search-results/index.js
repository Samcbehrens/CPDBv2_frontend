import React from 'react';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import PreviewPane from 'components/search-page/search-results/preview-pane';
import SearchResults from 'components/search-page/search-results';
import SearchNoResult from 'components/search-page/search-results/search-no-result';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchResults component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    const suggestionGroups = [];
    SearchResults.should.be.renderable({ suggestionGroups });
  });

  it('should render Loading when isRequesting', function () {
    instance = renderIntoDocument(
      <SearchResults isRequesting={ true }/>
    );
    findDOMNode(instance).innerText.should.containEql('Loading...');
  });

  it('should render SearchNoResult component when isEmpty', function () {
    instance = renderIntoDocument(
      <SearchResults isEmpty={ true }/>
    );

    findRenderedComponentWithType(instance, SearchNoResult).should.be.ok();
  });

  it('should render suggestionGroup components when data is available', function () {
    const suggestionGroups = [{ header: '1' }, { header: '2' }];
    instance = renderIntoDocument(
      <SearchResults isEmpty={ false } suggestionGroups={ suggestionGroups }/>
    );

    const renderedGroups = scryRenderedComponentsWithType(instance, SuggestionGroup);
    renderedGroups.should.have.length(2);
    renderedGroups[0].props.header.should.eql('1');
    renderedGroups[1].props.header.should.eql('2');
  });

  describe('Preview Pane', function () {
    it('should not render PreviewPane when no officer is focused', function () {
      const focusedSuggestion = {
        header: 'Neighborhood',
        text: 'Traci Walker',
        payload: {
          'result_extra_information': 'Badge # 2374',
          'result_reason': 'coaccused with Walter Ware (17626)',
          'result_text': 'Traci Walker',
          'to': '/officer/29811/'
        }
      };
      instance = renderIntoDocument(
        <SearchResults isEmpty={ false } focusedSuggestion={ focusedSuggestion }/>
      );

      const previewPane = scryRenderedComponentsWithType(instance, PreviewPane);
      previewPane.length.should.eql(0);
    });

    it('should render PreviewPane when a coaccused is focused', function () {
      const focusedSuggestion = {
        header: 'CO-ACCUSED',
        'officer_id': '12345',
        text: 'John Wang',
        'visual_token_background_color': '#fafafa',
        unit: '001',
        rank: 'Footballer',
        race: 'White',
        sex: 'Male',
        salary: '$99,999',
        payload: {
          'result_text': 'name',
          'result_extra_information': 'Badge # 123',
          'to': 'to',
          'result_reason': 'coaccused with David Beckham (7)'
        }
      };
      instance = renderIntoDocument(
        <SearchResults isEmpty={ false } focusedSuggestion={ focusedSuggestion }/>
      );

      const previewPane = findRenderedComponentWithType(instance, PreviewPane);
      const currentYear = (new Date()).getFullYear();

      previewPane.props.data.should.eql([
        ['unit', '001'],
        ['rank', 'Footballer'],
        [`${currentYear} salary`, '$99,999'],
        ['race', 'White'],
        ['sex', 'Male']
      ]);
      previewPane.props.officerId.should.eql('12345');
      previewPane.props.backgroundColor.should.eql('#fafafa');
      previewPane.props.title.should.eql('John Wang');
    });
  });

  it('should render PreviewPane when an officer is focused', function () {
    const focusedSuggestion = {
      header: 'OFFICER',
      id: '12345',
      text: 'John Wang',
      unit: '001',
      rank: null,
      salary: '$99,999',
      race: 'White',
      sex: 'Male',
      'visual_token_background_color': '#fafafa',
    };
    instance = renderIntoDocument(
      <SearchResults isEmpty={ false } focusedSuggestion={ focusedSuggestion }/>
    );

    const previewPane = findRenderedComponentWithType(instance, PreviewPane);
    const currentYear = (new Date()).getFullYear();

    previewPane.props.data.should.eql([
      ['unit', '001'],
      ['rank', null],
      [`${currentYear} salary`, '$99,999'],
      ['race', 'White'],
      ['sex', 'Male']
    ]);
    previewPane.props.officerId.should.eql('12345');
    previewPane.props.backgroundColor.should.eql('#fafafa');
    previewPane.props.title.should.eql('John Wang');
  });
});
