import * as types from '../constants/actionTypes';
import request from 'superagent';
import d3 from 'd3';
import moment from 'moment';
import { fetchRunSummaryData, fetchGraphData } from './dashboardActions';
import { closeModal } from './uiActions';
import analytics from '../utils/analytics';

/* Create new entry actions */

// Initiate workflow to post a new entry to the DB
export function createEntry() {
  return {
    type: types.CREATE_ENTRY,
    payload: {},
  };
}

// Server successfully added new entry to the DB
export function createEntrySuccess() {
  return {
    type: types.CREATE_ENTRY_SUCCESS,
    payload: {},
  };
}

// Server failed to add the new entry to the DB
export function createEntryFailed(error) {
  return {
    type: types.CREATE_ENTRY_FAILED,
    payload: {
      error: error,
    },
  };
}

export function clearSubmissionResult() {
  return {
    type: types.CLEAR_SUBMISSION_RESULT,
    payload: {},
  };
}

// Action creator to create and post a new entry
export function postEntry(newEntry) {
  return dispatch => {

    // Update App state to indicate a new entry is being created
    // Trigger UI spinner while XHR call completes
    dispatch(createEntry());
    analytics.trackEvent({
      category: 'addIndex',
      action: 'submitStart',
      label: 'Submit new entry index',
    });

    // Post new entry to backend and dispatch action based on result
    request
      .post('/api/entries')
      .send(newEntry)
      .end((err, res) => {
        if (err) {
          // Use server error message instead of default HTTP error
          const errObj = JSON.parse(res.text);
          analytics.trackEvent({
            category: 'addIndex',
            action: 'submitFailed',
            label: 'Submit new entry failed',
          });

          dispatch(createEntryFailed(errObj.error));
        } else {
          analytics.trackEvent({
            category: 'addIndex',
            action: 'submitSuccess',
            label: 'Submit new entry succeeded',
          });
          dispatch(closeModal());

          // Re-fetch all data and refresh UI
          dispatch(createEntrySuccess());
          dispatch(fetchRunSummaryData());
          dispatch(fetchGraphData());
          dispatch(fetchDataset());
        }
      });
  };
}

/* Retrieve full dataset actions */

// Initiate workflow to retrieve complete dataset
export function requestDataset() {
  return {
    type: types.REQUEST_DATASET,
    payload: {},
  };
}

// XHR successfully retrieved dataset
export function recieveDataset(dataset) {
  return {
    type: types.RECEIVE_DATASET,
    payload: {
      dataset,
    },
  };
}

// XHR failed to retrieve dataset
export function requestDatasetFailed(error) {
  return {
    type: types.REQUEST_DATASET_FAILED,
    payload: {
      error: error,
    },
  };
}

// Action creator workflow to request and process the run dataset
export function fetchDataset() {
  return dispatch => {

    // Notify App that dataset is being retrieved and to show spinner
    dispatch(requestDataset());

    request
      .get('/api/entries')
      .end((err, res) => {
        if (err) {
          dispatch(requestDatasetFailed(err));
        } else {
          let { dataset } = res.body;

          // Convert date string to date object
          // Add tidy date for tabulated data on manage entries view
          dataset = dataset.map((entry) => {
            entry.date = d3.time.format.iso.parse(entry.date);
            entry.tidyDate = moment(entry.date).format('dddd Do MMM YYYY');
            entry.dow = moment(entry.date).format('MM');
            return entry;
          });

          dispatch(recieveDataset(dataset));
        }
      });

  };
}
