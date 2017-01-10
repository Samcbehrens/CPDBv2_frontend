import React, { Component, PropTypes } from 'react';

import HoverableButton from 'components/common/hoverable-button';
import { buttonStyle } from './login-modal-button.style';


export default class LoginModalButton extends Component {
  render() {
    const { children, onClick, disabled, className } = this.props;

    return (
      <HoverableButton className={ className } onClick={ onClick } style={ buttonStyle } disabled={ disabled }>
        { children }
      </HoverableButton>
    );
  }
}

LoginModalButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
