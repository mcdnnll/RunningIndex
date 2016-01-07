import { DASHBOARD_LOADING, DASHBOARD_LOADED } from '../constants/actionTypes';

export default function dashboard(state = {}, action) {
  switch (action.type) {
    case DASHBOARD_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case DASHBOARD_LOADED:
      return Object.assign({}, state, {
        isLoading: false,
        runCount: action.payload.runCount,
        bestRun: action.payload.bestRun,
      });

    default:
      return state;
  }
}
