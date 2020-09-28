import React, { useState, useEffect } from 'react';
import SocketIOClient from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Base64 } from 'js-base64';
import ROUTES from './routes';
import server_api from './api/server_api';
import ENDPOINTS from './constants/endpoints';

let socket = SocketIOClient(ENDPOINTS.index);    

const App = () => {
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = () => {

  }

  const verifyUser = async () => {
    try {
      const response = await server_api.get(ENDPOINTS.verifyUser, {
        headers: {
          token: localStorage.getItem('account_token'),
        },
      });
      setUserID(response.data.id);
      setUsername(response.data.username);
    } catch (error) {
      console.log('An error occurs: ', error);  
    }
  }

  useEffect(() => {
    verifyUser();
  }, [])

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
          render={() => (
            ROUTES.room.component({ socket, userID, username })
          )}
        />
        <Route
          key={ROUTES.ingame.key}
          path={ROUTES.ingame.path}
          exact={ROUTES.ingame.exact}
          component={ROUTES.ingame.component}
        />
        {/* <Route
          key={ROUTES.user.key}
          path={ROUTES.user.path}
          exact={ROUTES.user.exact}
          component={ROUTES.user.component}
        /> */}
      </Switch>
    </Router>
  );
}

export default App;
