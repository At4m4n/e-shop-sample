import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.getElementById('root')
);
