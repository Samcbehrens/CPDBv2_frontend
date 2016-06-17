import React, { PropTypes } from 'react';
import Radium from 'radium';

import ArticleHeader from 'components/common/article-header';
import ArticleContent from 'components/common/article-content';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, tabletWrapperStyle, contentStyle, extraWideWrapperStyle, wrapperHoverStyle
} from './article-small.style';


class ArticleSmall extends ResponsiveStyleComponent {
  responsiveStyle() {
    const { style, hoverable } = this.props;

    return {
      [TABLET]: {
        wrapper: [wrapperStyle, tabletWrapperStyle, style.wrapper, hoverable && wrapperHoverStyle]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle, style.wrapper, hoverable && wrapperHoverStyle]
      },
      [EXTRA_WIDE]: {
        wrapper: [wrapperStyle, extraWideWrapperStyle, style.wrapper, hoverable && wrapperHoverStyle]
      }
    };
  }

  renderHeader() {
    const { style } = this.props;

    if (this.props.header) {
      return (
        <ArticleHeader style={ style.header }>{ this.props.header }</ArticleHeader>
      );
    }
    return null;
  }

  renderParagraphs() {
    const { style } = this.props;
    return (
      <div>
        { this.props.paragraphs.map((text, ind) => (
          <ArticleContent key={ ind } style={ style.paragraph }>{ text }</ArticleContent>
        )) }
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    return (
      <div key={ style.screen } className='article-small link--transition'
        style={ style.wrapper } onClick={ this.props.onClick }>
        <div style={ contentStyle }>
          { this.renderHeader() }
          { this.renderParagraphs() }
        </div>
      </div>
    );
  }
}

ArticleSmall.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.shape({
    wrapper: PropTypes.object,
    header: PropTypes.object,
    paragraph: PropTypes.object
  }),
  header: PropTypes.string,
  paragraphs: PropTypes.array.isRequired,
  hoverable: PropTypes.bool
};

ArticleSmall.defaultProps = {
  style: {}
};

export default Radium(ArticleSmall);
