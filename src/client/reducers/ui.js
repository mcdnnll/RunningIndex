import * as types from '../constants/actionTypes';

const initialState = {
  modalIsOpen: false,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_MODAL:
      return Object.assign({}, state, {
        modalIsOpen: true,
      });

    case types.CLOSE_MODAL:
      return Object.assign({}, state, {
        modalIsOpen: false,
      });

    default:
      return state;
  }
}
