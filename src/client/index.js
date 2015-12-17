import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import configuredStore from './store';

const store = configuredStore();
// Connect redux store to app
ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>, document.getElementById('app')
);
