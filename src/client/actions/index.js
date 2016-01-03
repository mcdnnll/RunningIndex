import * as types from '../constants/actionTypes';

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

// export function requestEntries() {
//   return {
//     type: types.REQUEST_ENTRIES,
//     payload:
//   }
// }
