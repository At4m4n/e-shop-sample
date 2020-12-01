import {ProductActionTypes} from "../actions/types/productActionTypes";

const initialState = {
  products: [],
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case ProductActionTypes.fetch.request:
      return {
        ...state,
      };
    case ProductActionTypes.fetch.success:
      return {
        ...state,
        products: [...action.payload],
        error: null,
      };
    case ProductActionTypes.fetch.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
