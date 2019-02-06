import React, { Component, PropTypes } from 'react';
import Breadcrumbs from 'redux-breadcrumb-trail';

import BreadcrumbsItemRendererContainer from 'containers/headers/shareable-header/breadcrumbs-item-renderer-container';
import HeaderButton from 'components/headers/shareable-header/header-button';
import { calculatePosition } from 'utils/dom';
import styles from './shareable-header.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';


export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'top'
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeShareMenu);
    addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeShareMenu);
    removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const newPosition = calculatePosition();
    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
    this.props.updateShareablePageScrollPosition(this.state.position);
  }

  render() {
    const { location, routes, params, Menu, buttonText } = this.props;

    const separatorRenderer = <li className='shareable-header-breadcrumb-separator'/>;

    return (
      <div className={ `${styles.shareableHeader} no-print` }>
        <div className='shareable-header-header-placeholder'/>
        <div className='shareable-header-outer'>
          <div className={ responsiveContainerStyles.responsiveContainer }>
            <div
              className='shareable-header-nav-bar'
              ref={ el => { this.placeholderElement = el; } }
            >
              <HeaderButton scrollPosition={ this.state.position } Menu={ Menu } buttonText={ buttonText }/>
              <Breadcrumbs
                className='breadcrumbs'
                routes={ routes }
                params={ params }
                location={ location }
                separatorRenderer={ separatorRenderer }
                itemRenderer={ BreadcrumbsItemRendererContainer }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShareableHeader.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  closeShareMenu: PropTypes.func,
  openShareMenu: PropTypes.func,
  shareMenuIsOpen: PropTypes.bool,
  updateShareablePageScrollPosition: PropTypes.func,
  Menu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  buttonText: PropTypes.string,
};

ShareableHeader.defaultProps = {
  params: {},
  location: {
    pathname: ''
  },
  routes: []
};
