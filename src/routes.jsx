import React from 'react';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/login/LoginPage';
import IngamePage from './pages/ingame/IngamePage';
import RoomPage from './pages/room/RoomPage';
import UserPage from './pages/user/UserPage';

const ROUTES = {
  landing: {
    key: "landing-page",
    path: "/",
    exact: true,
    component: (props) => <LandingPage {...props} />,
  },

  login: {
    key: "login-page",
    path: "/login",
    exact: true,
    component: (props) => <LoginPage {...props} />,
    // component: (props) => <LandingPage {...props} />,
  },

  room: {
    key: "room-page",
    path: "/room",
    exact: true,
    component: (props) => <RoomPage {...props} />,
  },

  ingame: {
    key: "ingame-page",
    path: "/ingame",
    exact: true,
    component: (props) => <IngamePage  {...props} />,
  },

  user: {
    key: "user-page",
    path: "/user",
    exact: true,
    component: (props) => <UserPage {...props} />,
  },
}

export default ROUTES;
