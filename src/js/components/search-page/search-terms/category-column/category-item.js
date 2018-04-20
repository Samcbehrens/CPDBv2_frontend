import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import Hoverable from 'components/common/higher-order/hoverable';
import { itemStyle, nameStyle } from './category-item.style';


class CategoryItem extends Component {

  render() {
    const { item, hovering, isFocused, handleItemClick, itemUniqueKey } = this.props;

    return (
      <div>
        <div
          style={ itemStyle(isFocused) }
          className={ classnames('term-item', 'test--category-item', { 'focused': isFocused }) }
          onClick={ () => handleItemClick(itemUniqueKey) }
        >
          <div
            style={ nameStyle(isFocused, hovering) }
            className='link--transition'>
            { item.name }
          </div>
        </div>
        { (isFocused && this.props.children) && (
          <div>
            { this.props.children }
          </div>
        ) }
      </div>
    );
  }
}

CategoryItem.propTypes = {
  item: PropTypes.object,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
  handleItemClick: PropTypes.func,
  itemUniqueKey: PropTypes.string,
  children: PropTypes.node
};

CategoryItem.defaultProps = {
  item: {},
  isFocused: false,
  hovering: false,
  itemUniqueKey: ''
};

export default Hoverable(CategoryItem);
