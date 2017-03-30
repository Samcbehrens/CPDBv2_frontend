import map from 'lodash/map';
import React, { Component, PropTypes } from 'react';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';


class DynamicForm extends Component {
  renderField({ name, label, component, mapDataToProps }, data) {
    return (
      <FormField key={ name } label={ label }>
        <component { ...mapDataToProps(data) }/>
      </FormField>
    );
  }

  render() {
    const { mapping, data } = this.props;
    return (
      <Form>
        {
          map(mapping, (field, index) => (this.renderField(field, data, index)))
        }
      </Form>
    );
  }
}

DynamicForm.propTypes = {
  mapping: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
};

export default DynamicForm;
