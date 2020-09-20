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
    component: () => <LandingPage />,
  },

  login: {
    key: "login-page",
    path: "/login",
    exact: true,
    component: () => <LoginPage />,
  },

  room: {
    key: "room-page",
    path: "/room",
    exact: true,
    component: () => <RoomPage />,
  },

  ingame: {
    key: "ingame-page",
    path: "/ingame",
    exact: true,
    component: () => <IngamePage />,
  },

  user: {
    key: "user-page",
    path: "/user",
    exact: true,
    component: () => <UserPage />,
  },
}

export default ROUTES;
