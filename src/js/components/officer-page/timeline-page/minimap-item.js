import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { itemStyle } from './minimap-item.style';


class MinimapItem extends Component {
  render() {
    const { text, hovering, active } = this.props;
    return (
      <span style={ itemStyle(hovering, active) }>{ text }</span>
    );
  }
}

MinimapItem.propTypes = {
  text: PropTypes.string,
  hovering: PropTypes.bool,
  active: PropTypes.bool
};

export default Hoverable(MinimapItem);
