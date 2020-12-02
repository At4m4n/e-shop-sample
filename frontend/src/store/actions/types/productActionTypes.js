import {ACTION} from '../../constants/commonConstants';
import {createRequestSuccessFailure} from '../../../utils';

const deepFreeze = require('deep-freeze');
const ENTITY = 'PRODUCT';

export const ProductActionTypes = deepFreeze({
  fetch: {
    ...createRequestSuccessFailure(ACTION.FETCH, ENTITY),
  },
});

export const FIND_PRODUCT_BY_ID = 'FIND_PRODUCT_BY_ID';
