import React, { Component, PropTypes } from 'react';

import styles from './title-widget.sass';


export default class TitleWidget extends Component {
  render() {
    const { title, subTitle } = this.props;
    return (
      <div className={ styles.titleWidget }>
        <p className='title-widget-title'>{ title }</p>
        <p className='title-widget-sub-title'>{ subTitle }</p>
      </div>
    );
  }
}

TitleWidget.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
};
