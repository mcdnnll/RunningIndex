import * as types from '../constants/actionTypes';

export default function dashboard(state = {}, action) {
  switch (action.type) {
    case types.DASHBOARD_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case types.DASHBOARD_LOADED:
      return Object.assign({}, state, {
        isLoading: false,
        runCount: action.payload.runCount,
        bestRun: action.payload.bestRun,
      });

    case types.DASHBOARD_LOAD_FAILED:
      return Object.assign({}, state, {
        loadFailed: true,
      });

    default:
      return state;
  }
}
