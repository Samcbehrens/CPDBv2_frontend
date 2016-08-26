import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { UnconnectedFeaturedStoriesContainer } from 'containers/stories-page/featured-stories-container';
import StoryFactory from 'utils/test/factories/story';
import FeaturedStories from 'components/stories-page/featured-stories';
import StoriesPlaceHolder from 'components/stories-page/stories-place-holder';


describe('UnconnectedFeaturedStoriesContainer', function () {
  let instance;
  const stories = StoryFactory.buildList(2);

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render FeaturedStories when data is available', function () {
    instance = renderIntoDocument(
      <UnconnectedFeaturedStoriesContainer requestStories={ () => {} } dataAvailable={ true }
        featuredStories={ stories } openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, FeaturedStories);
  });

  it('should render StoriesPlaceHolder when data is not available', function () {
    instance = renderIntoDocument(
      <UnconnectedFeaturedStoriesContainer requestStories={ () => {} } dataAvailable={ false }
        featuredStories={ stories } openBottomSheetWithStory={ () => {} }/>
    );
    findRenderedComponentWithType(instance, StoriesPlaceHolder);
  });

  it('should call requestStories when it just mount', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <UnconnectedFeaturedStoriesContainer requestStories={ callback } dataAvailable={ false }
        featuredStories={ stories } openBottomSheetWithStory={ () => {} }/>
    );
    callback.called.should.be.true();
  });
});
