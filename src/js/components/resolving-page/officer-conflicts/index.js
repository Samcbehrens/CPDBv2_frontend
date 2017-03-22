import React, { Component, PropTypes } from 'react';

import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';

import OfficerForm from './officer-form';
import OfficerDetail from './officer-detail';


class OfficerConflicts extends Component {
  render() {
    return (
      <Columns>
        <Section
          pad='medium'
          margin='small'
          colorIndex='light-2'>
          <OfficerDetail labeled={ true }/>
        </Section>
        <Section
          pad='medium'
          margin='small'
          colorIndex='light-2'>
          <OfficerDetail/>
        </Section>
        <Section align='center'
          pad='medium'
          margin='small'
          colorIndex='light-2'>
          <OfficerForm/>
        </Section>
      </Columns>
    );
  }
}

OfficerConflicts.propTypes = {
  officer: PropTypes.object
};

OfficerConflicts.defaultProps = {
  officer: {
    'first_name': 'Aaron',
    'last_name': 'Jeffery',
    'middle_initial': 'M',
    'race': 'White',
    'gender': 'Male',
    'on_duty': true
  }
};

export default OfficerConflicts;
