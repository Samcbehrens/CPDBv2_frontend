import React from 'react';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType, scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import TextInput from 'grommet/components/TextInput';
import CheckBox from 'grommet/components/CheckBox';
import DateTime from 'grommet/components/DateTime';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerForm from 'components/resolving-page/officer-form';


describe('OfficerForm component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render first name, last name, middle initial, race, gender, on duty and appointed date', function () {
    const officer = {
      'first_name': 'Foo',
      'last_name': 'Bar',
      'middle_initial': 'M',
      'race': 'White',
      'gender': 'Male',
      'active': true,
      'appointed_date': '02/02/2002'
    };

    instance = renderIntoDocument(<OfficerForm officer={ officer }/>);
    const textInputs = scryRenderedComponentsWithType(instance, TextInput);
    const checkbox = findRenderedComponentWithType(instance, CheckBox);
    const dateTimeComponent = findRenderedComponentWithType(instance, DateTime);

    textInputs[0].props.value.should.equal('Foo');
    textInputs[1].props.value.should.equal('Bar');
    textInputs[2].props.value.should.equal('M');
    textInputs[3].props.value.should.equal('White');
    textInputs[4].props.value.should.equal('Male');
    checkbox.props.checked.should.be.true();
    dateTimeComponent.props.value.should.equal('02/02/2002');
  });

  it('should render children', function () {
    instance = renderIntoDocument(
      <OfficerForm>
        <div className='test-class'/>
      </OfficerForm>
    );

    scryRenderedDOMComponentsWithClass(instance, 'test-class').should.have.length(1);
  });

  it('should handle data change', function () {
    const officer = {
      'first_name': 'Foo',
      'last_name': 'Bar',
      'middle_initial': 'M',
      'race': 'White',
      'gender': 'Male',
      'active': true,
      'appointed_date': '02/02/2002'
    };
    const handler = spy();
    instance = renderIntoDocument(<OfficerForm officer={ officer } handleDataChanges={ handler }/>);
    const textInputs = scryRenderedComponentsWithType(instance, TextInput);

    textInputs[0].props.onDOMChange({ target: { value: '123' } });
    handler.calledWith('first_name', '123').should.be.true();

    const checkbox = findRenderedComponentWithType(instance, CheckBox);
    checkbox.props.onChange({ target: { checked: false } });
    handler.calledWith('active', false);

    const dateTimeComponent = findRenderedComponentWithType(instance, DateTime);
    dateTimeComponent.props.onChange('20-11-2012');
    handler.calledWith('appointed_date', '20-11-2012');
  });
});
