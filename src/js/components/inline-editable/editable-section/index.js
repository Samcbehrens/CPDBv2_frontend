import React, { Component, PropTypes } from 'react';
import { map, values, mapValues } from 'lodash';
import { convertToRaw } from 'draft-js';

import { wrapperStyle } from './editable-section.style';
import { convertContentStateToEditorState } from 'utils/draft';
import { officersToSnakeCase, officersToCamelCase } from 'utils/case-converting-tranform';


export default function (SubComponent) {
  class EditableSection extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: mapValues(props.fields, this.deserializeField)
      };
      this.handleUpdateFieldValue = this.handleUpdateFieldValue.bind(this);
      this.handleSaveForm = this.handleSaveForm.bind(this);
      this.fieldProps = this.fieldProps.bind(this);
    }

    getChildContext() {
      return {
        sectionEditModeOn: this.props.sectionEditModeOn
      };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        fields: mapValues(nextProps.fields, this.deserializeField)
      });
    }

    deserializeField(field) {
      if (!field) {
        return field;
      }

      switch (field.type) {
        case 'rich_text':
          return {
            ...field,
            value: convertContentStateToEditorState(field.value)
          };
        case 'officers_list':
          return {
            ...field,
            value: officersToCamelCase(field.value)
          };
      }
      return field;
    }

    serializeField(field) {
      switch (field.type) {
        case 'rich_text':
          return {
            ...field,
            value: convertToRaw(field.value.getCurrentContent())
          };
        case 'officers_list':
          return {
            ...field,
            value: officersToSnakeCase(field.value)
          };
      }
      return field;
    }

    handleSaveForm() {
      const data = map(values(this.state.fields), this.serializeField);
      this.props.onSaveForm({ fields: data })
      .then(() => this.props.turnOffSectionEditMode());
    }

    handleUpdateFieldValue(fieldName, fieldValue) {
      const { fields } = this.state;
      const field = fields[fieldName];

      this.setState({
        fields: {
          ...fields,
          [fieldName]: {
            ...field,
            value: fieldValue
          }
        }
      });
    }

    fieldProps(field, fieldName) {
      const { sectionEditModeOn } = this.props;
      return {
        value: field && field.value,
        editModeOn: sectionEditModeOn,
        onChange: val => this.handleUpdateFieldValue(fieldName, val)
      };
    }

    render() {
      const {
        sectionEditModeOn, turnOnSectionEditMode, turnOffSectionEditMode,
        ...restProps
      } = this.props;
      const { fields } = this.state;

      return (
        <div style={ wrapperStyle(sectionEditModeOn) }>
          <SubComponent
            sectionEditModeOn={ sectionEditModeOn }
            editToggleProps={ {
              sectionEditModeOn,
              turnOnSectionEditMode,
              turnOffSectionEditMode,
              onSaveForm: this.handleSaveForm
            } }
            fieldProps={
              mapValues(fields, this.fieldProps)
            }
            { ...restProps }/>
        </div>
      );
    }
  }

  EditableSection.propTypes = {
    fields: PropTypes.object,
    onSaveForm: PropTypes.func,
    sectionEditModeOn: PropTypes.bool,
    turnOnSectionEditMode: PropTypes.func,
    turnOffSectionEditMode: PropTypes.func
  };

  EditableSection.childContextTypes = {
    sectionEditModeOn: PropTypes.bool
  };

  return EditableSection;
}
