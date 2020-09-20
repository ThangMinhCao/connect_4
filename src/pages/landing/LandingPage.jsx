import React from 'react';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../routes';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../constants/colors';
import COLORS from '../../constants/colors';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: COLORS.landing.background,
  },

  headerText: {
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(5vw + 2vh)',
  },

  button: {
    height: '25vh',
    width: '50vw',
  },

  startButton: {
    backgroundColor: COLORS.startGame,
    '&:hover': {
      backgroundColor: COLORS.startGameHover,
    },
  },

  loginButton: {
    backgroundColor: COLORS.landing.login,
    '&:hover': {
      backgroundColor: COLORS.landing.loginHover,
    },
  },

  buttonText: {
    color: 'white',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(2vw + 2vh)',
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const onPlayAsGuestClick = () => {
    history.push(ROUTES.room.patch);
  }

  const onLoginClick = () => {
    history.push(ROUTES.login.patch);
  }

  return (
    <div className={classes.page}>
      <Typography className={classes.headerText}>
        CONNECT 4
      </Typography>

      <Button
        className={`${classes.button} ${classes.startButton}`}
        onClick={onPlayAsGuestClick}
      >
        <Typography variant="h4" className={classes.buttonText}>
          START AS A GUEST
        </Typography>
      </Button>

      <Button
        className={`${classes.button} ${classes.loginButton}`}
        onClick={onLoginClick}
      >
        <Typography variant="h4" className={classes.buttonText}>
          LOGIN
        </Typography>
      </Button>
    </div>
  )
}

export default LandingPage;
