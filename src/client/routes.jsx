import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import HomeContainer from './containers/HomeContainer';
import DashboardContainer from './containers/DashboardContainer';
import ManageContainer from './containers/ManageContainer';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="/statistics" component={DashboardContainer} />
    <Route path="/manage" component={ManageContainer} />
  </Route>
);

export default routes;
