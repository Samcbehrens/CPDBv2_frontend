import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { rowDividerStyle, textStyle, nameStyle, personaInfoStyle, wrapperStyle } from './officer-info.style';


class OfficerInfo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { openOfficerPage } = this.props;
    const { id } = this.props.info;
    openOfficerPage(id);
  }

  render() {
    const { info, style, hovering } = this.props;
    const { fullName, birthYear, race, gender } = info;
    const currentYear = (new Date()).getFullYear();

    return (
      <div style={ { ...wrapperStyle, ...style } } onClick={ this.handleClick }>
        <div style={ textStyle }>
          Officer
        </div>
        <div style={ nameStyle(hovering) }>
          { fullName }
        </div>
        <div style={ rowDividerStyle } />
        <div style={ personaInfoStyle }>
          { currentYear - birthYear } year old, { race }, { gender }.
        </div>
      </div>
    );
  }
}

OfficerInfo.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    birthYear: PropTypes.number,
    race: PropTypes.string,
    gender: PropTypes.string,
  }),
  style: PropTypes.object,
  hovering: PropTypes.bool,
  openOfficerPage: PropTypes.func,
};

export default Hoverable(OfficerInfo);
