import React, { Component, PropTypes } from 'react';

import MoreLink from 'components/common/more-link';
import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle, iconStyle, linkStyle, iconHoverStyle, linkHoverStyle } from './most-recent-email-link.style';


class MostRecentEmailLink extends Component {
  render() {
    const { hovering, href } = this.props;
    return (
      <div style={ wrapperStyle }>
        <i className='link--transition' style={ hovering ? iconHoverStyle : iconStyle }/>
        <MoreLink style={ hovering ? linkHoverStyle : linkStyle } showAccentColor={ hovering } href={ href }>
          Most Recent Email
        </MoreLink>
      </div>
    );
  }
}

MostRecentEmailLink.propTypes = {
  hovering: PropTypes.bool,
  href: PropTypes.string
};

export default Hoverable(MostRecentEmailLink);
