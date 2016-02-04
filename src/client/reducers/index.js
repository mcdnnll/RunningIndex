import { combineReducers } from 'redux';
import entries from './entries';
import dashboard from './dashboard';
import ui from './ui';
import { routeReducer } from 'react-router-redux';

const reducer = combineReducers({
  entries,
  dashboard,
  ui,
  routing: routeReducer,
});

export default reducer;
