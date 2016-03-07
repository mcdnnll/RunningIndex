import * as types from '../constants/actionTypes';

export default function entries(state = {}, action) {
  switch (action.type) {
    case types.CREATE_ENTRY:
      return Object.assign({}, state, {
        addEntryPosted: true,
      });

    case types.CREATE_ENTRY_SUCCESS:
      return Object.assign({}, state, {
        addEntryPosted: false,
        addEntryResult: 'success',
      });

    case types.CREATE_ENTRY_FAILED:
      return Object.assign({}, state, {
        addEntryPosted: false,
        addEntryFailed: true,
        addEntryResult: action.payload.error,
      });

    case types.REQUEST_DATASET:
      return Object.assign({}, state, {
        datasetIsLoading: true,
      });

    case types.RECEIVE_DATASET:
      return Object.assign({}, state, {
        datasetIsLoading: false,
        dataset: action.payload.dataset,
      });

    case types.REQUEST_DATASET_FAIL:
      return Object.assign({}, state, {
        datasetIsLoading: false,
        error: action.payload.error,
      });

    case types.CLEAR_SUBMISSION_RESULT:
      return Object.assign({}, state, {
        addEntryFailed: false,
        addEntryResult: '',
      });

    default:
      return state;
  }
}
