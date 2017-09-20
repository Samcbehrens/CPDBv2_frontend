import React, { Component, PropTypes } from 'react';

import { wrapperStyle, labelStyle, contentStyle } from './row.style';


export default class Row extends Component {
  render() {
    const { label, content, hasBorderBottom } = this.props;
    return (
      <div style={ wrapperStyle(hasBorderBottom) }>
        <span className='test--row-label' style={ labelStyle }>{ label }</span>
        <span className='test--row-content' style={ contentStyle }>{ content }</span>
      </div>
    );
  }
}

Row.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string,
  hasBorderBottom: PropTypes.bool
};

Row.defaultProps = {
  hasBorderBottom: true
};
