import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';

const logger = createLogger();

const createStoreWithMiddleWare = compose(
  applyMiddleware(thunk, logger)
)(createStore);

export default function configuredStore(initialState) {
  return createStoreWithMiddleWare(reducer, initialState);
}
