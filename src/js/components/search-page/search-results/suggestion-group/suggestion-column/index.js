import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { suggestionColumnStyle } from './suggestion-column.style';
import SuggestionItem from './suggestion-item';


export default class SuggestionColumn extends Component {
  renderSuggestions() {
    const { contentType, suggestions, suggestionClick, groupIndex } = this.props;

    return map(suggestions, (suggestion, index) => {
      return (
        <SuggestionItem
          key={ index }
          contentType={ contentType }
          suggestion={ suggestion }
          suggestionClick={ suggestionClick }
          itemIndex={ index }
          groupIndex={ groupIndex } />
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
  index: PropTypes.number,
  suggestions: PropTypes.array,
  contentType: PropTypes.string,
  suggestionClick: PropTypes.func
};

SuggestionColumn.defaultProps = {
  suggestionClick: () => {}
};
