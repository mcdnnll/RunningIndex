import {ADD_ENTRY} from '../constants/actionTypes';

export default function entries(state = [], action) {
  switch (action.type) {
    case ADD_ENTRY:
      return [
        ...state,
        {
          runningIndex: action.payload.runningIndex,
          location: action.payload.location,
        },
      ];
    default:
      return state;
  }
}
