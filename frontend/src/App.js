import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { CHECKOUT_PATH, PRODUCTS_PATH, SUCCESS_PATH } from './constants/apiConstants';
import CheckoutPage from './container/CheckoutPage';
import PurchaseSuccessPage from './container/SuccessPage';
import ViewProductsPage from './container/ViewProductsPage';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { selectCurrentProduct } from './selectors/productSelectors';
import { createStructuredSelector } from 'reselect';

function App(props) {
  const { product } = props;
  return (
    <>
      <Switch>
        <Route exact path={PRODUCTS_PATH} component={ViewProductsPage}/>
        {product !== null && (<>
          <Route exact path={CHECKOUT_PATH} component={CheckoutPage}/>
          <Route exact path={SUCCESS_PATH} component={PurchaseSuccessPage}/>
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
