import React, { Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { contentStyle, wrapperStyle } from './twitter-section.style';
import TwitterEmbeddedTimeline from './twitter-embedded-timeline';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import NoRerender from 'components/common/higher-order/no-rerender';


class TwitterSection extends Component {
  responsiveStyle() {
    return {
      [TABLET]: {
        height: 484
      },
      [DESKTOP]: {
        height: 500
      },
      [EXTRA_WIDE]: {
        height: 600
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
        <div style={ contentStyle }>
          <TwitterEmbeddedTimeline height={ style.height }/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

export default NoRerender(ConfiguredRadium(TwitterSection));
