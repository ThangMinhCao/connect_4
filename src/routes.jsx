import React from 'react';
import LandingPage from './landing/LandingPage';
import MainPage from './main/MainPage';
import LoginPage from './login/LoginPage';
import IngamePage from './ingame/IngamePage';
import RoomPage from './room/RoomPage';
import UserPage from './user/UserPage';

const ROUTES =[
  {
    patch: "/",
    exact: true,
    component: () => <LandingPage />,
  },

  {
    patch: "/main",
    exact: true,
    component: () => <MainPage />,
  },

  {
    patch: "/login",
    exact: true,
    component: () => <LoginPage />,
  },

  {
    patch: "/room",
    exact: true,
    component: () => <RoomPage />,
  },

  {
    patch: "/ingame",
    exact: true,
    component: () => <IngamePage />,
  },

  {
    patch: "/user",
    exact: true,
    component: () => <UserPage />,
  },
]

export default ROUTES;
