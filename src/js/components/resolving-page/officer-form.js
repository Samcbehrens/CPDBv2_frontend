import React, { Component, PropTypes } from 'react';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import CheckBox from 'grommet/components/CheckBox';
import DateTime from 'grommet/components/DateTime';


class OfficerForm extends Component {
  render() {
    const { officer, children, disabled } = this.props;

    return (
      <Form compact={ true }>
        { children }
        <FormField label='First Name'>
          <TextInput disabled={ disabled } name='first_name' value={ officer['first_name'] || '' }/>
        </FormField>
        <FormField label='Last Name'>
          <TextInput disabled={ disabled } name='last_name' value={ officer['last_name'] || '' }/>
        </FormField>
        <FormField label='Middle Initial'>
          <TextInput disabled={ disabled } name='middle_initial' value={ officer['middle_initial'] || '' }/>
        </FormField>
        <FormField label='Race'>
          <TextInput disabled={ disabled } name='race' value={ officer['race'] || '' }/>
        </FormField>
        <FormField label='Gender'>
          <TextInput disabled={ disabled } name='gender' value={ officer['gender'] || '' }/>
        </FormField>
        <FormField label='On Duty'>
          <CheckBox
            disabled={ disabled } name='on_duty' checked={ officer['on_duty'] } toggle={ false } readOnly={ true }/>
        </FormField>
        <FormField label='Appointed Date'>
          <DateTime name='appointed_date' disabled={ disabled } format='M/D/YYYY' value={ officer['appointed_date'] }/>
        </FormField>
      </Form>
    );
  }
}

OfficerForm.propTypes = {
  officer: PropTypes.object.isRequired,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

OfficerForm.defaultProps = {
  disabled: false,
  officer: {
    'first_name': 'Aaron',
    'last_name': 'Jeffery',
    'middle_initial': 'M',
    'race': 'White',
    'gender': 'Male',
    'on_duty': true,
    'appointed_date': '03/02/2017'
  }
};

export default OfficerForm;
