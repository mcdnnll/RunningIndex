import {Map} from 'immutable';
import {expect} from 'chai';

import manageEntries from '../../reducers/manageEntries';
import * as types from '../../constants/actionTypes';

describe('Greeting reducer', () => {
  it('should handle initial state', () => {
    const newState = manageEntries(undefined, {});
    expect(newState.entries.length).to.equal(0);
  });

  it('should return new state objecy with location of "Griffith"', () => {
    const entry = {
      type: types.ADD_ENTRY,
      payload: {
        runningIndex: 90,
        location: 'Griffith',
      },
    };

    const newState = manageEntries(undefined, entry);

    expect(newState).to.be.an('object');
    expect(newState.entries[0].location).to.equal('Griffith');
  });

  // it('should return same state for an unknown action', () => {
  //   const greetObj = Map({'greeting': 'Hello World!'});
  //   const greeting = greet(greetObj, {});

  //   expect(greeting).to.equal(greetObj);
  // });
});
