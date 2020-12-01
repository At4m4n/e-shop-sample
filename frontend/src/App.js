import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {
  PRODUCTS_PATH,
  PURCHASE_PATH,
  PURCHASE_SUCCESS_PATH
} from "./pathsConstants";
import ViewProductsPage from "./container/ViewProductsPage";
import PurchasePage from "./container/PurchasePage";
import PurchaseSuccessPage from "./container/PurchaseSuccessPage";

function App() {
  return (
      <Switch>
        <Route exact path={PRODUCTS_PATH} component={ViewProductsPage}/>
        <Route exact path={PURCHASE_PATH} component={PurchasePage}/>
        <Route exact path={PURCHASE_SUCCESS_PATH} component={PurchaseSuccessPage}/>
      </Switch>
  );
}

export default App;
