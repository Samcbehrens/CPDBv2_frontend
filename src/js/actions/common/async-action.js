import Cookies from 'js-cookie';
import { getMockAdapter } from 'mock-api';


export const get = (url, types) => ((params, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      url,
      params,
      adapter
    }
  }
}));

const authorizationHeaders = () => ({
  headers: {
    'Authorization': Cookies.get('apiAccessToken') ?
        `Token ${Cookies.get('apiAccessToken')}`
        : null
  }
});

const postWithConfig = (config=() => ({})) => (url, types) => ((data, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      method: 'post',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const post = postWithConfig();

export const authenticatedPost = postWithConfig(authorizationHeaders);

const patchWithConfig = (config=() => ({})) => (url, types) => ((data, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      method: 'patch',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const patch = patchWithConfig();

export const authenticatedPatch = patchWithConfig(authorizationHeaders);

const destroyWithConfig = (config=() => ({})) => (url, types) => ((data, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      method: 'delete',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const destroy = destroyWithConfig();

export const authenticatedDestroy = destroyWithConfig(authorizationHeaders);
