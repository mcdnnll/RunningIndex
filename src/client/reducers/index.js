import { combineReducers } from 'redux';
import entries from './entries';
import { routeReducer } from 'redux-simple-router';

const reducer = combineReducers({
  entries,
  routing: routeReducer,
});

export default reducer;
