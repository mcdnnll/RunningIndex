import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';
import routes from './routes';
import configuredStore from './store';

const store = configuredStore();
// const history = createHistory();
const history = createBrowserHistory();

syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>, document.getElementById('app')
);
