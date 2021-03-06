import React from 'react';
import {
  renderIntoDocument,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';


describe('NavigationButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correct text', function () {
    instance = renderIntoDocument(<NavigationButton text='Some text'/>);
    findDOMNode(instance).textContent.should.eql('Some text');
  });

  it('should hide when printing', function () {
    instance = renderIntoDocument(<NavigationButton text='Some text'/>);
    findDOMNode(instance).className.should.containEql('no-print');
  });
});
