import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import CheckBox from 'grommet/components/CheckBox';


class OfficerDetail extends Component {
  renderField({ field, label, component }, index, last) {

  }

  render() {
    const { officer } = this.props;

    return (
      <List>
        <ListItem
          pad='medium'
          justify='between'>
          <span>First Name</span>
          <span>{ officer['first_name'] }</span>
        </ListItem>
        <ListItem
          pad='medium'
          justify='between'>
          <span>Last Name</span>
          <span>{ officer['last_name'] }</span>
        </ListItem>
        <ListItem
          pad='medium'
          justify='between'>
          <span>Middle Initial</span>
          <span>{ officer['middle_initial'] }</span>
        </ListItem>
        <ListItem
          pad='medium'
          justify='between'>
          <span>Race</span>
          <span>{ officer['race'] }</span>
        </ListItem>
        <ListItem
          pad='medium'
          justify='between'>
          <span>Gender</span>
          <span>{ officer['gender'] }</span>
        </ListItem>
        <ListItem
          pad='medium'
          justify='between'
          separator='none'>
          <CheckBox defaultChecked={ officer['on_duty'] }
            label='On Duty'
            toggle={ false }
            reverse={ true }
            disabled={ true }/>
        </ListItem>
      </List>
    );
  }
}

OfficerDetail.propTypes = {
  officer: PropTypes.object.isRequired
};

OfficerDetail.defaultProps = {
  officer: {
    'first_name': 'Aaron',
    'last_name': 'Jeffery',
    'middle_initial': 'M',
    'race': 'White',
    'gender': 'Male',
    'on_duty': true
  }
};

export default OfficerDetail;
