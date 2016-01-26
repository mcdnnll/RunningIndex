import * as types from '../constants/actionTypes';
import request from 'superagent';

export function addEntry(runningIndex, location) {
  return {
    type: types.ADD_ENTRY,
    payload: {
      runningIndex,
      location,
    },
  };
}

export function addEntryAsync(runningIndex, location) {
  return dispatch => {
    setTimeout(() => {
      dispatch(addEntry(runningIndex, location));
    }, 2000);
  };
}

export function requestRunSummaryData() {
  return {
    type: types.REQUEST_RUN_SUMMARY_DATA,
    payload: {},
  };
}

export function requestRunSummaryDataFailed() {
  return {
    type: types.REQUEST_RUN_SUMMARY_DATA_FAILED,
    payload: {},
  };
}

export function receiveRunSummaryData(runCountData, bestRunData, lifetimeTotal) {
  return {
    type: types.RECEIVE_RUN_SUMMARY_DATA,
    payload: {
      runCount: runCountData,
      bestRun: bestRunData,
      lifetimeTotal: lifetimeTotal,
    },
  };
}

export function fetchRunSummaryData() {
  return dispatch => {
    dispatch(requestRunSummaryData());

    request
      .get('/api/summary')
      .end((err, res) => {
        if (err) {
          dispatch(requestRunSummaryDataFailed());
        } else {
          dispatch(receiveRunSummaryData(res.body.runCount, res.body.bestRun, res.body.lifetimeTotal));
        }
      });
  };
}

export function requestGraphData() {
  return {
    type: types.REQUEST_GRAPH_DATA,
    payload: {},
  };
}

export function requestGraphDataFailed() {
  return {
    type: types.REQUEST_GRAPH_DATA_FAILED,
    payload: {},
  };
}

export function receiveGraphData(dataset) {
  return {
    type: types.RECEIVE_GRAPH_DATA,
    payload: {
      graphData: dataset,
    },
  };
}

export function fetchGraphData() {
  return dispatch => {
    dispatch(requestGraphData());

    request
      .get('/api/entries')
      .end((err, res) => {
        if (err) {
          dispatch(requestGraphDataFailed());
        } else {
          dispatch(receiveGraphData(res.body));
        }
      });
  };
}
