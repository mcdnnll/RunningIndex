import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import {createStore} from 'redux';
import reducer from './reducers';

const store = createStore(reducer);

// Connect redux store to app
ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>, document.getElementById('app')
);
