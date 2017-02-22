import React, { Component, PropTypes } from 'react';
import { map, chunk } from 'lodash';

import { suggestionGroupStyle, groupHeaderStyle } from './suggestion-group.style';
import SuggestionColumn from './suggestion-column';
import LoadMoreButton from './load-more-button';



export default class SuggestionGroup extends Component {
  renderColumns() {
    const { suggestions, header, suggestionClick, columnIndex, navigation } = this.props;

    return map(chunk(suggestions, 10), (suggestions, key) => {
      return (
        <SuggestionColumn
          key={ key }
          navigation={ navigation }
          suggestionClick={ suggestionClick }
          contentType={ header }
          suggestions={ suggestions }
          index={ key }
          columnIndex={ columnIndex + key } />
      );
    });
  }

  renderLoadMore() {
    const { suggestions, onLoadMore, header } = this.props;

    if (suggestions.length === 9) {
      return (
        <LoadMoreButton onLoadMore={ onLoadMore } header={ header }/>
      );
    }
    return null;
  }

  render() {
    const { suggestions, header } = this.props;

    if (suggestions.length > 0) {
      return (
        <div style={ suggestionGroupStyle } className='suggestion-group'>
          <div style={ groupHeaderStyle }>{ header }</div>
          { this.renderColumns() }
          { this.renderLoadMore() }
        </div>
      );
    }
    return null;
  }
}

SuggestionGroup.propTypes = {
  columnIndex: PropTypes.number,
  navigation: PropTypes.array,
  suggestions: PropTypes.array,
  header: PropTypes.string,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  header: ''
};
