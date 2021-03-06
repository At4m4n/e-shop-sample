import {ACTION} from '../../constants/actionConstants';
import {createRequestSuccessFailure} from '../../utils/utils';

const deepFreeze = require('deep-freeze');
const PRODUCT = 'PRODUCT';
const CHARGE = 'PRODUCT_CHARGE';

export const ProductActionTypes = deepFreeze({
  fetch: {
    ...createRequestSuccessFailure(ACTION.FETCH, PRODUCT),
  },
  createCharge: {
    ...createRequestSuccessFailure(ACTION.CREATE, CHARGE),
  },
});

export const FIND_PRODUCT_BY_ID = 'FIND_PRODUCT_BY_ID';
