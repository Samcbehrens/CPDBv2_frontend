import React, { Component, PropTypes } from 'react';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import CheckBox from 'grommet/components/CheckBox';
import DateTime from 'grommet/components/DateTime';


class OfficerForm extends Component {
  render() {
    const { officer } = this.props;

    return (
      <Form compact={ true }>
        <FormField label='First Name'>
          <TextInput
            name='first_name'
            defaultValue={ officer['first_name'] }/>
        </FormField>
        <FormField label='Last Name'>
          <TextInput
            name='last_name'
            defaultValue={ officer['last_name'] }/>
        </FormField>
        <FormField label='Middle Initial'>
          <TextInput
            name='middle_initial'
            defaultValue={ officer['middle_initial'] }/>
        </FormField>
        <FormField label='Race'>
          <TextInput
            name='race'
            defaultValue={ officer['race'] }/>
        </FormField>
        <FormField label='Gender'>
          <TextInput
            name='gender'
            defaultValue={ officer['gender'] }/>
        </FormField>
        <FormField label='On Duty'>
          <CheckBox
            name='on_duty'
            defaultChecked={ officer['on_duty'] }
            toggle={ false }/>
        </FormField>
        <FormField label='Appointed Date'>
          <DateTime name='appointed_date'
            format='M/D/YYYY'
            defaultValue={ officer['appointed_date'] }/>
        </FormField>
      </Form>
    );
  }
}

OfficerForm.propTypes = {
  disabled: PropTypes.bool,
  officer: PropTypes.object.isRequired
};

OfficerForm.defaultProps = {
  disabled: false,
  officer: {
    'first_name': 'Aaron',
    'last_name': 'Jeffery',
    'middle_initial': 'M',
    'race': 'White',
    'gender': 'Male',
    'on_duty': true
  }
};

export default OfficerForm;
