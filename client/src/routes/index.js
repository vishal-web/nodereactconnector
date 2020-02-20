import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HOME from './Home';
import STORIES from './Stories';

const ROUTES = [
  {
    exact: true,
    component: HOME,
    path: '/'
  },
  {
    exact: true,
    component: STORIES,
    path: '/stories'
  },
]


const RouteWrapper = () => (
  <Router>
    <Switch>
      {ROUTES.map((row, index) => {
        return (
          <Route key={index} exact={row.exact} path={row.path} component={row.component} />
        )
      })}
    </Switch>
  </Router>
)


export default RouteWrapper;