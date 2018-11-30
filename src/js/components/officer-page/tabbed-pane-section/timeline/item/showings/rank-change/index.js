import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import baseStyles from '../base-item.sass';
import styles from './rank-change.sass';


export default class RankChange extends Component {
  render() {
    const { rank, oldRank, date } = this.props.item;

    return (
      <span className={ cx(styles.rankChange, baseStyles.baseItem) }>
        <span className='item-content rank-change-item-content'>
          <span className='rank-change-info'>
            <span className={ cx('old-rank', { 'unassigned': oldRank === 'Unknown' }) }>{ oldRank } → </span>
            <span className='new-rank'>{ rank }</span>
          </span>
          <span className='item-date rank-change-item-date'>{ date }</span>
        </span>
      </span>
    );
  }
}

RankChange.propTypes = {
  item: PropTypes.object,
};
