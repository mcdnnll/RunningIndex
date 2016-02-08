import * as types from '../constants/actionTypes';

/* Actions to manage visibility of modal */

export function openModal() {
  return {
    type: types.OPEN_MODAL,
    payload: {},
  };
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL,
    payload: {},
  };
}
