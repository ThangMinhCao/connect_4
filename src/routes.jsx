import React from 'react';
import LandingPage from './pages/landing/LandingPage';
import MainPage from './pages/main/MainPage';
import LoginPage from './pages/login/LoginPage';
import IngamePage from './pages/ingame/IngamePage';
import RoomPage from './pages/room/RoomPage';
import UserPage from './pages/user/UserPage';

const ROUTES = {
  landing: {
    key: "landing-page",
    patch: "/",
    exact: true,
    component: () => <LandingPage />,
  },

  main: {
    key: "main-page",
    patch: "/main",
    exact: true,
    component: () => <MainPage />,
  },

  login: {
    key: "login-page",
    patch: "/login",
    exact: true,
    component: () => <LoginPage />,
  },

  room: {
    key: "room-page",
    patch: "/room",
    exact: true,
    component: () => <RoomPage />,
  },

  ingame: {
    key: "ingame-page",
    patch: "/ingame",
    exact: true,
    component: () => <IngamePage />,
  },

  user: {
    key: "user-page",
    patch: "/user",
    exact: true,
    component: () => <UserPage />,
  },
}

export default ROUTES;
