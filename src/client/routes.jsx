import React from 'react';
import {Route} from 'react-router'; 
import App from './containers/App';
import CounterContainer from './containers/CounterContainer';

const routes = <Route component={App}>
    <Route path="/" component={CounterContainer} />
</Route>;

export default routes;
