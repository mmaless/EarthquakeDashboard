import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import RefreshPage from './pages/RefreshPage';
import NotFoundPage from './pages/NotFoundPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={DashboardPage} />
        <Route path='/refresh' exact component={RefreshPage} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect to='/404' />
      </Switch>
    );
  }
}

export default Routes;
