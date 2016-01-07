import { combineReducers } from 'redux';
import entries from './entries';
import dashboard from './dashboard';
import { routeReducer } from 'redux-simple-router';

const reducer = combineReducers({
  entries,
  dashboard,
  routing: routeReducer,
});

export default reducer;
