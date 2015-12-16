import {Map} from 'immutable';
import {expect} from 'chai';

import greet from '../../reducers/greeting';
import {GET_GREETING} from '../../constants/actionTypes';

describe('Greeting reducer', () => {
  it('should handle initial state', () => {
    const greeting = greet(undefined, {});

    expect(greeting).to.equal(Map());
  }); 

  it('should return "Hello World!" greeting', () => {
    const greeting = greet(undefined, {type: GET_GREETING});

    expect(greeting).to.be.an('object');
    expect(greeting.get('greeting')).to.equal('Hello World!');
  });

  it('should return same state for an unknown action', () => {
    const greetObj = Map({'greeting': 'Hello World!'});
    const greeting = greet(greetObj, {});
    
    expect(greeting).to.equal(greetObj);
  });
});
