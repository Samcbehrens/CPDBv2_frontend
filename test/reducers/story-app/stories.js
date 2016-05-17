import { STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';
import stories from 'reducers/story-app/stories';


describe('stories reducer', function () {
  it('should return initial state', function () {
    stories(undefined, {}).should.eql([]);
  });

  it('should handle STORIES_REQUEST_SUCCESS', function () {
    const expectStories = [1, 2, 3];
    stories(undefined, {
      type: STORIES_REQUEST_SUCCESS,
      payload: {
        stories: [1, 2, 3]
      }
    }).should.eql(expectStories);
  });
  it('should handle STORIES_REQUEST_FAILURE', function () {
    stories([1, 2, 3], {
      type: STORIES_REQUEST_FAILURE
    }).should.eql([]);
  });
});