import { FIND_PRODUCT_BY_ID, ProductActionTypes } from '../actions/types/productActionTypes';

const initialState = {
  products: [],
  product: null,
  charge: null,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ProductActionTypes.fetch.request:
    case ProductActionTypes.createCharge.request:
      return {
        ...state,
      };
    case ProductActionTypes.fetch.success:
      return {
        ...state,
        products: [...action.payload],
        error: null,
      };
      case ProductActionTypes.createCharge.success:
      return {
        ...state,
        charge: action.payload,
        error: null,
      };
    case ProductActionTypes.fetch.failure:
    case ProductActionTypes.createCharge.failure:
      return {
        ...state,
        error: action.payload,
      };
    case FIND_PRODUCT_BY_ID:
      return {
        ...state,
        product: state.products.filter((product) => product.id === action.payload)[0]
      };
    default:
      return state;
  }
}
