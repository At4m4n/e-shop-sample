import {get} from 'lodash';
import {STATE} from '../constants/actionConstants';
import {ProductActionTypes} from '../actions/types/productActionTypes';

const GENERAL_ERROR = 'Something went wrong. Please try again later.';

const DEFAULT_ERROR_MESSAGE = {
  [ProductActionTypes.fetch.failure]: 'Failed to fetch products.',
};

export const apiError = () => (next) => (action) => {
  const {type, payload = {}} = action;
  if (typeof type === 'string' &&
      type.includes(STATE.FAILURE) &&
      payload.isAxiosError) {
    const defaultMessage = DEFAULT_ERROR_MESSAGE[type] || GENERAL_ERROR;
    const errorMessage = get(
        payload,
        ['response', 'data', 'message'],
        defaultMessage);
    console.error(`[${type}]`, payload.response);
    return next({
      type,
      payload: errorMessage,
    });
  }
  return next(action);
};
