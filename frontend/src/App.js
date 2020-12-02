import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { CHECKOUT_PATH, PRODUCTS_PATH, PURCHASE_SUCCESS_PATH } from './constants';
import CheckoutPage from './container/CheckoutPage';
import PurchaseSuccessPage from './container/PurchaseSuccessPage';
import ViewProductsPage from './container/ViewProductsPage';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectCurrentProduct } from './store/selectors/productSelectors';
import { createStructuredSelector } from 'reselect';

function App(props) {
  const { product } = props;
  return (
    <>
      <Switch>
        <Route exact path={PRODUCTS_PATH} component={ViewProductsPage}/>
        {product !== null && (<>
          <Route exact path={CHECKOUT_PATH} component={CheckoutPage}/>
          <Route exact path={PURCHASE_SUCCESS_PATH} component={PurchaseSuccessPage}/>
        </>)}
        {product === null && <Redirect to={PRODUCTS_PATH}/>}
      </Switch>
    </>
  );
}

App.propTypes = {
  product: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  product: selectCurrentProduct,
});

export default connect(mapStateToProps)(App);
