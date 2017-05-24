import React, { Component, PropTypes } from 'react';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import CheckBox from 'grommet/components/CheckBox';
import DateTime from 'grommet/components/DateTime';


class OfficerForm extends Component {
  constructor(props) {
    super(props);
    this.handleChangeTextField = this.handleChangeTextField.bind(this);
  }

  handleChangeTextField(field) {
    return (e) => { this.props.handleDataChanges(field, e.target.value) }
  }

  render() {
    const { officer, children, disabled, handleDataChanges } = this.props;

    return (
      <Form compact={ true }>
        { children }
        <FormField className='test--first-name' label='First Name'>
          <TextInput ref='firstName' name='first_name' value={ officer['first_name'] || '' }  onDOMChange={ this.handleChangeTextField('first_name') }/>
        </FormField>

        <FormField className='test--last-name' label='Last Name'>
          <TextInput disabled={ disabled } name='last_name' value={ officer['last_name'] || '' } onDOMChange={ this.handleChangeTextField('last_name') }/>
        </FormField>

        <FormField className='test--middle-initial' label='Middle Initial'>
          <TextInput disabled={ disabled } name='middle_initial' value={ officer['middle_initial'] || '' } onDOMChange={ this.handleChangeTextField('middle_initial') } />
        </FormField>

        <FormField className='test--race' label='Race'>
          <TextInput disabled={ disabled } name='race' value={ officer['race'] || '' } onDOMChange={ this.handleChangeTextField('race') } />
        </FormField>

        <FormField className='test--gender' label='Gender'>
          <TextInput disabled={ disabled } name='gender' value={ officer['gender'] || '' } onDOMChange={ this.handleChangeTextField('gender') }/>
        </FormField>

        <FormField className='test--active' label='Active'>
          <CheckBox  disabled={ disabled } name='active' checked={ !!officer['active'] } toggle={ false } onChange={ (e) => { handleDataChanges('active', e.target.checked); } }/>
        </FormField>

        <FormField className='test--appointed-date' label='Appointed Date'>
          <DateTime name='appointed_date' disabled={ disabled } format='YYYY-MM-DD'
                    value={ officer['appointed_date'] }
                    onChange={ (e) => { handleDataChanges('appointed_date', e); } }/>
        </FormField>
      </Form>
    );
  }
}

OfficerForm.propTypes = {
  officer: PropTypes.object.isRequired,
  handleDataChanges: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

OfficerForm.defaultProps = {
  disabled: false,
  officer: {},
  handleDataChanges: () => {}
};

export default OfficerForm;
