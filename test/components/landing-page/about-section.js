import React from 'react';

import AboutSection from 'components/landing-page/about-section';


describe('AboutSection component', function () {
  it('should render', function () {
    AboutSection.should.be.renderable({
      headerText: 'a',
      body: [{ value: 'a' }]
    });
    AboutSection.should.be.responsiveRenderable();
  });
});
