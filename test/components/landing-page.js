import React from 'react';

import LandingPage from 'components/landing-page';
import configureStore from 'redux-mock-store';
import RawStoryFactory from 'utils/test/factories/raw-story';


const mockStore = configureStore();
const store = mockStore({
  storyApp: {
    stories: [1, 2, 3].map(id => RawStoryFactory.build({ id: id })),
    featuredStoryId: 1
  }
});

describe('LandingPage component', function () {
  it('should render', function () {
    LandingPage.should.be.renderable({ store: store });
  });
});
