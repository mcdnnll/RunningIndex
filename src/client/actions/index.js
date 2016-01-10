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

export function dashboardLoading() {
  return {
    type: types.DASHBOARD_LOADING,
    payload: {},
  };
}

export function dashboardLoadFailed() {
  return {
    type: types.DASHBOARD_LOAD_FAILED,
    payload: {},
  };
}

export function dashboardLoaded(runCountData, bestRunData) {
  return {
    type: types.DASHBOARD_LOADED,
    payload: {
      runCount: runCountData,
      bestRun: bestRunData,
    },
  };
}

export function getDashboardData() {
  return dispatch => {
    dispatch(dashboardLoading());

    request
      .get('/api/dashboard')
      .end((err, res) => {
        if (err) {
          dispatch(dashboardLoadFailed());
        } else {
          dispatch(dashboardLoaded(res.body.runCount, res.body.bestRun));
        }
      });
  };
}

