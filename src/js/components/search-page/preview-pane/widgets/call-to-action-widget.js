import React, { Component, PropTypes } from 'react';
import { containerStyle, buttonStyle, textStyle } from './view-widget.style';
import OutboundLink from 'components/common/outbound-link';


export default class CallToActionWidget extends Component {
  render() {
    return (
      <div style={ containerStyle }>
        <span style={ textStyle }>{ this.props.text }</span>
        <OutboundLink href={ this.props.url || '#' } style={ buttonStyle }>→</OutboundLink>
      </div>
    );
  }
}

CallToActionWidget.defaultProps = {
  text: 'View on the Data Tool'
};

CallToActionWidget.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
};
