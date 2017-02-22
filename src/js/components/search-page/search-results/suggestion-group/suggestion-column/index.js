import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { suggestionColumnStyle } from './suggestion-column.style';
import SuggestionItem from './suggestion-item';


export default class SuggestionColumn extends Component {
  renderSuggestions() {
    const { contentType, suggestions, suggestionClick, groupIndex, navigation } = this.props;
    const [currentGroupIndex, currentItemIndex] = navigation;
    let isFocused;

    return map(suggestions, (suggestion, index) => {
      isFocused = (groupIndex == currentGroupIndex) && (index == currentItemIndex);

      return (
        <SuggestionItem
          key={ index }
          contentType={ contentType }
          suggestion={ suggestion }
          suggestionClick={ suggestionClick }
          isFocused={ isFocused }/>
      );
    });
  }

  render() {
    return (
      <div style={ suggestionColumnStyle(this.props.index === 0) } className='suggestion-column'>
        {
          this.renderSuggestions()
        }
      </div>
    );
  }
}

SuggestionColumn.propTypes = {
  groupIndex: PropTypes.number,
  navigation: PropTypes.array,
  index: PropTypes.number,
  suggestions: PropTypes.array,
  contentType: PropTypes.string,
  suggestionClick: PropTypes.func
};

SuggestionColumn.defaultProps = {
  navigation: [],
  suggestionClick: () => {}
};
