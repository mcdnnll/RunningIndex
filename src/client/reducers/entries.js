import * as types from '../constants/actionTypes';

export default function entries(state = [], action) {
  switch (action.type) {
    case types.POST_ENTRY:
      return [
        ...state,
        {
          runningIndex: action.payload.runningIndex,
          location: action.payload.location,
        },
      ];

    // case types.POST_ENTRY_SUCCESS:
    //   break;

    // case types.POST_ENTRY_FAIL:
    //   break;

    case types.REQUEST_DATASET:
      return Object.assign({}, state, {
        datasetIsLoading: true,
      });

    case types.RECEIVE_DATASET:
      return Object.assign({}, state, {
        datasetIsLoading: false,
        isoDateDataset: action.payload.isoDateDataset,
        tidyDateDataset: action.payload.tidyDateDataset,

      });

    case types.REQUEST_DATASET_FAIL:
      return Object.assign({}, state, {
        datasetIsLoading: false,
        error: action.payload.error,
      });

    default:
      return state;
  }
}
