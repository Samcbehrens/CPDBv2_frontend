import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import Hoverable from 'components/common/higher-order/hoverable';
import { suggestionItemStyle, suggestionTextStyle, metaTextStyle, reasonStyle } from './suggestion-item.style';


class SuggestionItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(text, href) {
    const { suggestionClick, contentType } = this.props;
    suggestionClick(contentType, text, href);
  }

  render() {
    const { suggestion, hovering } = this.props;
    const text = get(suggestion, 'payload.result_text', '');
    const href = get(suggestion, 'payload.url', '');
    const extraText = get(suggestion, 'payload.result_extra_information', '');
    const reason = get(suggestion, 'payload.result_reason', '');

    return (
      <a href={ href }
        style={ suggestionItemStyle }
        onClick={ this.handleClick.bind(this, text, href) }>
        <div
          className='link--transition'
          style={ suggestionTextStyle(hovering) }>
          { text }
        </div>
        <div
          className='link--transition'
          style={ metaTextStyle(hovering) }>
          { extraText }
        </div>
        <div
          className='link--transition'
          style={ reasonStyle(hovering) }>
          { reason }
        </div>
      </a>
    );
  }
}

SuggestionItem.defaultProps = {
  suggestionClick: () => {}
};

SuggestionItem.propTypes = {
  suggestion: PropTypes.object,
  suggestionClick: PropTypes.func,
  hovering: PropTypes.bool,
  contentType: PropTypes.string
};

export default Hoverable(SuggestionItem);
