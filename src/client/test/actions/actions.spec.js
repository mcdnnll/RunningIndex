import {expect} from 'chai';
import {createStore} from 'redux';
import reducer from '../../reducers';
import * as types from '../../constants/actionTypes';

const store = createStore(reducer);

describe('Entry actions', () => {

  it('should connect to store', () => {
    const entry = {
      type: types.ADD_ENTRY,
      payload: {
        runningIndex: 90,
        location: 'Griffith',
      },
    };
    store.dispatch(entry);

    const currentState = store.getState();
    expect(currentState.manageEntries.entries[0].runningIndex).to.be.a('number');
    expect(currentState.manageEntries.entries[0].runningIndex).to.equal(90);

  });
});
