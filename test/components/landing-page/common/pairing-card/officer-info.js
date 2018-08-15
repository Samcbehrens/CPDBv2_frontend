import React from 'react';

import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';


describe('OfficerInfo component', function () {
  let instance;
  const info = {
    id: '123',
    fullName: 'Jerome Finnigan',
    age: 54,
    race: 'White',
    gender: 'Male',
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render personal information of the officer correctly', function () {
    instance = renderIntoDocument(
      <OfficerInfo info={ info }/>
    );
    const officerFullName = findRenderedDOMComponentWithClass(instance, 'test--officer-name');
    const officerPersonalInfo = findRenderedDOMComponentWithClass(instance, 'test--officer-personal-info');
    officerPersonalInfo.textContent.should.eql('54 year old, White, Male.');
    officerFullName.textContent.should.eql('Jerome Finnigan');
  });

  it('should change the color of full name of the officer when hovering', function () {
    instance = renderIntoDocument(
      <OfficerInfo info={ info } hovering={ true } />
    );
    const officerFullName = findRenderedDOMComponentWithClass(instance, 'test--officer-name');
    officerFullName.style.color.should.eql('rgb(0, 94, 244)');
  });
});
