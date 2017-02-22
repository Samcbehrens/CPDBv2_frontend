import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { resultWrapperStyle } from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';


export default class SuggestionResults extends Component {
  renderGroups() {
    const { suggestionGroups, onLoadMore, searchText, isEmpty, isRequesting, suggestionClick, navigation } = this.props;

    if (isRequesting) {
      return 'Loading...';
    }

    if (isEmpty) {
      return (
        <SuggestionNoResult searchText={ searchText }/>
      );
    }
    // FIXME: Refactor it by a more convinient way
    let i = -1;

    return map(suggestionGroups, function (suggestions, key) {
      i = i + 1;

      return (
        <SuggestionGroup
          onLoadMore={ onLoadMore }
          key={ `suggestion-group-${key}` }
          navigation={ navigation }
          suggestions={ suggestions }
          suggestionClick={ suggestionClick }
          header={ key }
          groupIndex={ i } />
      );
    });
  }

  render() {
    return (
      <div style={ resultWrapperStyle }>
        <div className='content-wrapper'>
          { this.renderGroups() }
        </div>
      </div>
      );
  }
}

SuggestionResults.propTypes = {
  navigation: PropTypes.array,
  searchText: PropTypes.string,
  suggestionGroups: PropTypes.object,
  isRequesting: PropTypes.bool,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  isEmpty: PropTypes.bool
};
