import React from 'react';
import {Route} from 'react-router';
import App from './containers/App';
import EntryContainer from './containers/EntryContainer';

const routes = <Route component={App}>
    <Route path="/" component={EntryContainer} />
</Route>;

export default routes;
