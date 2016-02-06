import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';

export const reduxRouter = syncHistory(browserHistory);
const logger = createLogger();

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxRouter, logger)
    )
  );
  reduxRouter.listenForReplays(store);

  return store;
}
