import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTES from './routes';
// import server_api from './api/server_api';
// import ENDPOINTS from './constants/endpoints';

const App = () => {
  // const [userID, setUserID] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log(localStorage.getItem('account_token'));
  }

  // const printUserID = () => {
  //   console.log(userID);
  // }

  return (
    <Router>
      <Switch>
        <Route
          key={ROUTES.landing.key}
          path={ROUTES.landing.path}
          exact={ROUTES.landing.exact}
          render={() => (
            ROUTES.landing.component()
          )}
        />
        <Route
          key={ROUTES.login.key}
          path={ROUTES.login.path}
          exact={ROUTES.login.exact}
          // component={ROUTES.login.component}
          render={() => (
            ROUTES.login.component({ handleLogin })
          )}
        />
        <Route
          key={ROUTES.room.key}
          path={ROUTES.room.path}
          exact={ROUTES.room.exact}
          component={ROUTES.room.component}
        />
        <Route
          key={ROUTES.ingame.key}
          path={ROUTES.ingame.path}
          exact={ROUTES.ingame.exact}
          component={ROUTES.ingame.component}
        />
        <Route
          key={ROUTES.user.key}
          path={ROUTES.user.path}
          exact={ROUTES.user.exact}
          component={ROUTES.user.component}
        />
      </Switch>
    </Router>
  );
}

export default App;
