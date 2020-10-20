import React, { useState, useEffect } from 'react';
import SocketIOClient from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import ROUTES from './routes';
import server_api from './api/server_api';
import ENDPOINTS from './constants/endpoints';

let socket = SocketIOClient(ENDPOINTS.index);    

const App = () => {
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await server_api.put(ENDPOINTS.logout, null, {
        headers: {
          token: localStorage.getItem('account_token'),
        },
      });
    } catch (error) {
      console.log('An error occurs: ', error);  
    }
  }

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await server_api.get(ENDPOINTS.verifyUser, {
          headers: {
            token: localStorage.getItem('account_token'),
          },
        });
        if (response.data.error) {
          console.log(response.data.error);
          history.push('/');
        }
        setUserID(response.data.id);
        setUsername(response.data.username);
      } catch (error) {
        console.log('An error occurs: ', error);  
      }
    }
    verifyUser();

    window.onpopstate = function(event) {
      window.location.reload();
    };

    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      // event.returnValue = '';
      handleLogout();
    });
  }, [history])

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
          component={ROUTES.login.component}
          // render={() => (
          //   ROUTES.login.component()
          // )}
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
          render={() => (
            ROUTES.ingame.component({ socket, userID })
          )}
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
