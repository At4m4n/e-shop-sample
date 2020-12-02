import composeSimpleApiCallingAction
  from './actionsUtil/composeSimpleApiCallingAction';
import {ProductActionTypes} from "./types/productActionTypes";
import { chargeApiRequests, productsApiRequests } from '../../api/apiRequests';
import { createAction } from './actionsUtil/actionCreator';
import { PURCHASE_SUCCESS_PATH } from '../../constants';
import history from '../../history';

export const fetchProducts = composeSimpleApiCallingAction(
    ProductActionTypes.fetch.request,
    ProductActionTypes.fetch.success,
    ProductActionTypes.fetch.failure,
    async function() {
      return await productsApiRequests.get('');
    }
);
export const chargeProductPrice = (request) => async (dispatch) => {
  dispatch(createAction(ProductActionTypes.createCharge.request));
  try {
    const response = await chargeApiRequests.post('', request);
    dispatch(createAction(ProductActionTypes.createCharge.success, response.data));
    history.push(PURCHASE_SUCCESS_PATH)
  }
  catch (error) {
    dispatch(createAction(ProductActionTypes.createCharge.failure, error));
  }
};
