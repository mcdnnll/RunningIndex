import * as types from '../constants/actionTypes';
import request from 'superagent';
import d3 from 'd3';


/* RunSummary Actions */

// Initiate workflow to request data for dashboard cards
export function requestRunSummaryData() {
  return {
    type: types.REQUEST_RUN_SUMMARY_DATA,
    payload: {},
  };
}

// XHR successfully retrieved data for populating dashboard cards
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

export function requestRunSummaryDataFailed() {
  return {
    type: types.REQUEST_RUN_SUMMARY_DATA_FAILED,
    payload: {},
  };
}

// Actions creator workflow to retrieve data for dashboard cards
export function fetchRunSummaryData() {
  return dispatch => {

    // Initiative XHR and notify UI to display spinner
    dispatch(requestRunSummaryData());

    request
      .get('/api/dashboard/summary')
      .end((err, res) => {
        if (err) {
          dispatch(requestRunSummaryDataFailed());
        } else {
          dispatch(receiveRunSummaryData(res.body.runCount, res.body.bestRun, res.body.lifetimeTotal));
        }
      });
  };
}


/* Graph Actions */

// Initiate workflow to retrieve data for dashboard graphs
export function requestGraphData() {
  return {
    type: types.REQUEST_GRAPH_DATA,
    payload: {},
  };
}

// XHR successfully retrieved graph data
export function receiveGraphData(monthlyAvg) {
  return {
    type: types.RECEIVE_GRAPH_DATA,
    payload: {
      monthlyAvg: monthlyAvg,
    },
  };
}

export function requestGraphDataFailed(error) {
  return {
    type: types.REQUEST_GRAPH_DATA_FAILED,
    payload: {
      error: error,
    },
  };
}

// Action creator workflow to request data for use in graphs
export function fetchGraphData() {
  return dispatch => {

    // Update app state to indicate new data is being requested
    // Trigger UI Spinner while XHR completes
    dispatch(requestGraphData());

    request
      .get('/api/dashboard/graph')
      .end((err, res) => {
        if (err) {
          dispatch(requestGraphDataFailed());
        } else {
          let { monthlyAvg } = res.body;
          const dateFormat = d3.time.format('%m-%Y');

          // Build date property from individual data fields
          monthlyAvg = monthlyAvg.map((entry) => {
            entry.date = dateFormat.parse(entry.mnth.toString() + '-' + entry.yr.toString());
            return entry;
          });

          dispatch(receiveGraphData(monthlyAvg));
        }
      });
  };
}
