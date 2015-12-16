import {expect} from 'chai';
import {createStore} from 'redux';

import {getGreeting} from '../../actions';
import reducer from '../../reducers';

const store = createStore(reducer);

describe('Greeting actions', () => {
 
  it('should connect to store', () => {
    console.log(store.dispatch({type: 'GET_GREETING'}));
  }); 
});
