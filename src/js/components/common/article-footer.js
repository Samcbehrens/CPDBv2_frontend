import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { assign } from 'lodash';

import { footerStyle, linkStyle } from './article-footer.style';


class ArticleFooter extends React.Component {
  render() {
    const { style, className, href, children, onClick } = this.props;
    return (
      <div style={ [footerStyle, style.wrapper] } className={ className }>
        <Link to={ href } style={ assign({}, linkStyle, style.link) } onClick={ onClick }>
          { children }
        </Link>
      </div>
    );
  }
}

ArticleFooter.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({
    wrapper: PropTypes.object,
    link: PropTypes.object
  }),
  onClick: PropTypes.func
};

ArticleFooter.defaultProps = {
  style: {},
  href: '#'
};

export default Radium(ArticleFooter);
