import React, { PropTypes } from 'react';
import Radium from 'radium';

import { navStyle } from './footer-nav-link.style';


class FooterNavLink extends React.Component {
  render() {
    return (
      <a href={ this.props.href } style={ [navStyle, this.props.style] }>
        { this.props.children }
      </a>
    );
  }
}

FooterNavLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  style: PropTypes.object
};

export default Radium(FooterNavLink);
