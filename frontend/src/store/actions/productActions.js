import composeSimpleApiCallingAction
  from './actionsUtil/composeSimpleApiCallingAction';
import {ProductActionTypes} from "./types/productActionTypes";
import {productsApiRequests} from "../../api/apiRequests";

export const fetchProducts = composeSimpleApiCallingAction(
    ProductActionTypes.fetch.request,
    ProductActionTypes.fetch.success,
    ProductActionTypes.fetch.failure,
    async function() {
      return await productsApiRequests.get('');
    }
);
