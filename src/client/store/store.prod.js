import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export const reduxRouter = syncHistory(browserHistory);

const createStoreWithMiddleWare = compose(
  applyMiddleware(thunk, reduxRouter)
)(createStore);

export default function configuredStore(initialState) {
  return createStoreWithMiddleWare(reducer, initialState);
}
