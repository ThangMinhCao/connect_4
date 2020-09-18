import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTES from './routes';

const App = () => {
  return (
    <Router>
      <Switch>
        {
          ROUTES.map((route) => {
            return <Route path={route.patch} exact={route.exact} component={route.component} />
          })
        }
      </Switch>
    </Router>
  );
}

export default App;
