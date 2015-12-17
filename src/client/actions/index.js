import * as types from '../constants/actionTypes';

/**
* Action creators
*/

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

