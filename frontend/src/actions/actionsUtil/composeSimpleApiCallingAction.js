import _ from 'lodash';

export default function composeSimpleApiCallingAction(
    requestActionType,
    successActionType,
    errorActionType,
    workingFunction,
    onSuccessHandler) {
  return (...args) => async (dispatch) => {
    dispatch(createAction(requestActionType));
    try {
      const response = await workingFunction(...args);
      dispatch(createAction(successActionType, response.data));
      if (!onSuccessHandler) {
        onSuccessHandler();
      }
      return response;
    } catch (error) {
      dispatch(createAction(errorActionType, error));
      return error;
    }
  };
}

const createAction = (type, payload, meta) => ({
  type,
  payload: _.defaultTo(payload, undefined),
  meta: _.defaultTo(meta, undefined),
});
