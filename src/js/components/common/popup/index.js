import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid/v4';

import { wrapperStyle, innerStyle, titleStyle, textStyle } from './popup.style';


export default class Popup extends Component {
  render() {
    const { text, title, style } = this.props;
    const tooltipId = `tooltip-${uuid()}`;
    return (
      <span>
        <ReactTooltip id={ tooltipId } className='popup' effect='solid' type='light' offset={ { top: -10 } }>
          <div style={ titleStyle }>{ title }</div>
          <div style={ textStyle }>{ text }</div>
        </ReactTooltip>
        <div
          style={ { ...wrapperStyle, ...style } }
          data-tip={ true }
          data-for={ tooltipId }
          className='test--popup-button'
        >
          <span style={ innerStyle }>i</span>
        </div>
      </span>
    );
  }
}

Popup.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
};

Popup.defaultProps = {
  style: {},
};
