import { createSelector } from 'reselect';

import { getPaginationInfo } from 'selectors/common/pagination-selector';
import { DEFAULT_IMAGE_DIMENSION } from 'utils/constants';
import { mediaUrl } from 'utils/static-assets';


const getIsRequesting = state => state.landingPage.storyApp.isRequesting;

const getStories = state => state.landingPage.storyApp.stories;

const getFeaturedStoryId = state => state.landingPage.storyApp.featuredStoryId;

export function getImageUrl(story) {
  return (story['image_url'] && mediaUrl(story['image_url'][DEFAULT_IMAGE_DIMENSION])) || '';
}

export function rawStoryTransform(story) {
  return {
    id: story.id,
    title: story.title,
    canonicalUrl: story['canonical_url'],
    newspaperName: story.newspaper && story.newspaper.name,
    newspaperShortName: story.newspaper && story.newspaper['short_name'],
    date: story['post_date'],
    paragraphs: story.body && story.body.map(p => p.value),
    imageUrl: getImageUrl(story)
  };
}

export const getStoriesSelector = createSelector(getStories, (stories) => {
  return stories.results.map(rawStoryTransform);
});

export const paginationSelector = createSelector(getStories, getPaginationInfo);

export const featuredStorySelector = createSelector(
  getStoriesSelector,
  getFeaturedStoryId,
  (stories, featuredStoryId) => {
    let featuredStory = stories.find(story => story.id === featuredStoryId);
    return featuredStory ? featuredStory : stories[0];
  }
);

export const smallStoriesSelector = createSelector(
  getStoriesSelector,
  featuredStorySelector,
  (stories, featureStory) => {
    let smallStories = stories.filter(story => story.id !== featureStory.id);
    return smallStories.slice(0, 2);
  }
);

export const dataAvailableSelector = createSelector(
  getIsRequesting,
  getStoriesSelector,
  (isRequesting, stories) => {
    return !isRequesting && stories.length >= 3;
  }
);
