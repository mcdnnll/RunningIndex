import * as types from '../constants/actionTypes';

export default function dashboard(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_RUN_SUMMARY_DATA:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case types.RECEIVE_RUN_SUMMARY_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        runCount: action.payload.runCount,
        bestRun: action.payload.bestRun,
        lifetimeTotal: action.payload.lifetimeTotal,
      });

    case types.REQUEST_RUN_SUMMARY_DATA_FAILED:
      return Object.assign({}, state, {
        loadFailed: true,
      });

    /* Reducers for graph */
    case types.REQUEST_GRAPH_DATA:
      return Object.assign({}, state, {
        graphIsLoading: true,
      });

    case types.REQUEST_GRAPH_DATA_FAILED:
      return Object.assign({}, state, {
        loadFailed: true,
      });

    case types.RECEIVE_GRAPH_DATA:
      return Object.assign({}, state, {
        graphIsLoading: false,
        graphData: action.payload.graphData,
      });

    default:
      return state;
  }
}
