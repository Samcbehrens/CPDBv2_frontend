import { createAction } from 'redux-actions';
import axiosMiddleware, { getActionTypes } from 'redux-axios-middleware';

import axiosClient from 'utils/axios-client';


export const getErrorMessage = (url, status) => (`Request to ${url} failed with status code ${status}.`);

export const onSuccess = ({ action, next, response }, options) => {
  const nextAction = createAction(getActionTypes(action, options)[1])(response.data);
  next(nextAction);
  return nextAction;
};

export const onError = ({ action, next, error }, options) => {
  let errorObject;
  if (error instanceof Error) {
    errorObject = error;
  } else {
    errorObject = new Error(error.data.message);
  }

  const nextAction = createAction(getActionTypes(action, options)[2])(errorObject);
  next(nextAction);
  return nextAction;
};

export default axiosMiddleware(axiosClient, {
  onSuccess,
  onError,
  errorSuffix: '_FAILURE'
});
