import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';

export const reduxRouter = syncHistory(browserHistory);
const logger = createLogger();

const createStoreWithMiddleWare = compose(
  applyMiddleware(thunk, logger, reduxRouter)
)(createStore);

export default function configuredStore(initialState) {
  return createStoreWithMiddleWare(reducer, initialState);
}
