import React, { Component, PropTypes } from 'react';
import { isEmpty, debounce, head, values, keys } from 'lodash';
import Mousetrap from 'mousetrap';

import SearchResults from './search-results';
import SearchBox from './search-box';
import SearchTags from './search-tags';
import SearchNoInput from './search-no-input';
import {
  backButtonStyle, searchContentWrapperStyle, searchBoxStyle,
  resultWrapperStyle
} from './search-content.style.js';
import { dataToolSearchUrl } from 'utils/v1-url';
import { NAVIGATION_KEYS } from 'utils/constants';


const DEFAULT_SUGGESTION_LIMIT = 9;

export default class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.getSuggestion = debounce(props.getSuggestion, 100);
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    const { move } = this.props;
    Mousetrap.bind('esc', this.handleGoBack);
    NAVIGATION_KEYS.map((direction) => (Mousetrap.bind(
      direction,
      () => move(direction, this.props.suggestionColumns)
    )));
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc');
    NAVIGATION_KEYS.map((direction) => (Mousetrap.unbind(direction)));
  }

  handleChange({ currentTarget: { value } }) {
    const { contentType } = this.props;
    const limit = contentType ? null : DEFAULT_SUGGESTION_LIMIT;

    this.setState({
      value
    });

    if (value) {
      this.getSuggestion(value, { contentType, limit });
    } else {
      this.props.selectTag(null);
    }
  }

  handleSelect(contentType) {
    if (contentType === this.props.contentType) {
      this.getSuggestion(this.state.value, { limit: DEFAULT_SUGGESTION_LIMIT });
    } else {
      this.getSuggestion(this.state.value, { contentType });
    }
  }

  handleGoBack(e) {
    // Since mousetrap just send here an empty object, we might need this for the test to be passed
    !isEmpty(e) && e.preventDefault();
    this.props.router.goBack();
  }

  handleEnter(e) {
    const { suggestionGroups, trackRecentSuggestion } = this.props;
    const { value } = this.state;
    const firstRecord = head(head(values(suggestionGroups)));
    const contentType = head(keys(suggestionGroups));
    let url;

    if (firstRecord) {
      const text = firstRecord.payload['result_text'];
      url = firstRecord.payload.url;
      trackRecentSuggestion(contentType, text, url);
    } else {
      url = dataToolSearchUrl(value);
    }

    window.location.assign(url);
  }

  renderContent() {
    const {
      suggestionGroups, isRequesting, tags, contentType, navigation,
      isEmpty, recentSuggestions, trackRecentSuggestion
    } = this.props;

    if (!this.state.value) {
      return (
        <SearchNoInput recentSuggestions={ recentSuggestions }/>
      );
    }

    return (
      <div style={ resultWrapperStyle }>
        <SearchTags tags={ tags } onSelect={ this.handleSelect } selected={ contentType }/>
        <SearchResults
          navigation={ navigation }
          suggestionClick={ trackRecentSuggestion }
          isEmpty={ isEmpty }
          searchText={ this.state.value }
          onLoadMore={ this.handleSelect }
          suggestionGroups={ suggestionGroups }
          isRequesting={ isRequesting } />
      </div>
    );
  }

  render() {
    return (
      <div
        className='search-page'
        style={ searchContentWrapperStyle }>
        <div style={ searchBoxStyle }>
          <span
            onClick={ this.handleGoBack }
            className='searchbar__button--back'
            style={ backButtonStyle }/>
          <SearchBox
            onEscape={ this.handleGoBack }
            onChange={ this.handleChange }
            onEnter={ this.handleEnter }
            navigate={ this.props.move }
            value={ this.state.value }/>
        </div>
        <div style={ resultWrapperStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }
}

SearchContent.propTypes = {
  move: PropTypes.func,
  suggestionColumns: PropTypes.array,
  navigation: PropTypes.array,
  suggestionGroups: PropTypes.object,
  tags: PropTypes.array,
  recentSuggestions: PropTypes.array,
  isRequesting: PropTypes.bool,
  getSuggestion: PropTypes.func,
  selectTag: PropTypes.func,
  trackRecentSuggestion: PropTypes.func,
  contentType: PropTypes.string,
  isEmpty: PropTypes.bool,
  router: PropTypes.object
};

SearchContent.defaultProps = {
  suggestionGroups: {},
  isRequesting: false,
  getSuggestion: () => {},
  trackRecentSuggestion: () => {},
  router: {
    goBack: () => {}
  }
};
