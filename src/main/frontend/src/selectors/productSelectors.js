import {createSelector} from 'reselect';
import _ from "lodash";

export const productStateSelector = (state) => state.productReducer;

export const selectAllProducts = createSelector(
    productStateSelector,
    (state) => _.map(state.products, (product) => product)
);

export const selectCurrentProduct = createSelector(
  productStateSelector,
  (state) => state.product
);

export const selectCharge = createSelector(
  productStateSelector,
  (state) => state.charge
);
