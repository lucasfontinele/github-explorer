import React from 'react';

// Switch allow once component render
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/repositories/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
