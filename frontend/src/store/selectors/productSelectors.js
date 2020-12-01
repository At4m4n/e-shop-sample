import {createSelector} from 'reselect';
import _ from "lodash";

export const productStateSelector = (state) => state.productReducer;

export const selectAllProducts = createSelector(
    productStateSelector,
    (state) => _.map(state.products, (product) => product)
);
