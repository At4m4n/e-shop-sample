import { isNil } from 'lodash';

export const createAction = (type, payload, meta) => {
  if (isNil(payload) && isNil(meta))
    return { type };
  if (!isNil(payload) && isNil(meta))
    return { type, payload };
  return { type, payload, meta };
};
