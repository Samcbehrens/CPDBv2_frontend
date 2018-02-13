import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import { actionButtonStyle, actionStyle, linkStyle } from './call-to-action.style';
import HoverableButton from 'components/common/hoverable-button';


export default class CallToAction extends Component {
  constructor(props) {
    super(props);

    this.renderLink = this.renderLink.bind(this);
    this.renderViewAll = this.renderViewAll.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.typeMapping = {
      'link': this.renderLink,
      'view_all': this.renderViewAll
    };
  }

  handleEnterButtonClick() {
  }

  renderLink() {
    const { item } = this.props;

    return this.renderActionBarLayout(
      <a href={ item.link } style={ linkStyle } className={ 'test--call-to-action-link' }>
        Enter Data Tool
      </a>
    );
  }

  renderViewAll() {
    const { item } = this.props;

    return this.renderActionBarLayout(
      <div style={ linkStyle }>
        View ALL { item.name }
      </div>
    );
  }

  renderActionBarLayout(child) {
    return (
      <div className='test--preview-pane-action' style={ actionStyle }>
        <div>
          { child }
        </div>
        <HoverableButton
          className='test--enter-button'
          style={ actionButtonStyle }
          onClick={ this.handleEnterButtonClick }>
          enter
        </HoverableButton>
      </div>
    );
  }

  renderDefault() {
    return null;
  }

  render() {
    const { item } = this.props;

    const renderFunction = get(this.typeMapping, item['call_to_action_type'], this.renderDefault);

    return renderFunction();
  }
}

CallToAction.propTypes = {
  item: PropTypes.object
};