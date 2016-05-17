import axiosMockClient from 'utils/axios-mock-client';

// TODO: remove when have real api
const mockAdapter = axiosMockClient.adapter();

export const STORIES_REQUEST_START = 'STORIES_REQUEST_START';
export const STORIES_REQUEST_SUCCESS = 'STORIES_REQUEST_SUCCESS';
export const STORIES_REQUEST_FAILURE = 'STORIES_REQUEST_FAILURE';

export const STORIES_API_URL = '/stories';

export const requestStories = (params, adapter=mockAdapter) => ({
  types: [STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE],
  payload: {
    request: {
      url: STORIES_API_URL,
      params,
      adapter
    }
  }
});