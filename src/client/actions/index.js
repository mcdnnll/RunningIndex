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

