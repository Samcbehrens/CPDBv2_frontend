import React, { PropTypes, Component } from 'react';

import styles from './demographic.sass';
import cx from 'classnames';

export default class Demographics extends Component {
  render() {
    const { persons, className } = this.props;

    return (
      <div className={ className }>
        {
          persons.map((person, ind) => (
            <div key={ ind } className={ cx(styles.demographic, 'test--person-demographic') }>
              { person }
            </div>
          ))
        }
      </div>
    );
  }
}

Demographics.propTypes = {
  persons: PropTypes.array,
  className: PropTypes.string
};

Demographics.defaultProps = {
  persons: []
};
