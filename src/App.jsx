import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTES from './routes';

const App = () => {
  return (
    <Router>
      <Switch>
        {
          Object.entries(ROUTES).map(([routeName, route]) => {
            return (
              <Route
                key={route.key}
                path={route.patch}
                exact={route.exact}
                component={route.component}
              />
            )
          })
        }
      </Switch>
    </Router>
  );
}

export default App;
