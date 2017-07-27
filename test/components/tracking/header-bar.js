import React from 'react';


import HeaderBar from 'components/tracking/header-bar';
import { unmountComponentSuppressError } from 'utils/test';


describe('HeaderBar Component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    HeaderBar.should.be.renderable();
  });
});
