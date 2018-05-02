import React, { Component, PropTypes } from 'react';

import { wrapperStyle, titleStyle, contentStyle, fullWidthStyle } from './text-widget.style';


export default class TextWidget extends Component {
  render() {
    const { title, content, showFullWidth } = this.props;
    const extraStyle = showFullWidth ? fullWidthStyle : {};
    return (
      <div className='test--text-widget' style={ { ...wrapperStyle, ...extraStyle } }>
        <p style={ titleStyle }>{ title }</p>
        <p style={ contentStyle }>{ content }</p>
      </div>
    );
  }
}

TextWidget.defaultProps = {
  showFullWidth: false,
};

TextWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType(
    PropTypes.object,
    PropTypes.string,
  ),
  showFullWidth: PropTypes.bool,
};
