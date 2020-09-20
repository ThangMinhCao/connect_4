import React from 'react';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../routes';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
    // backgroundColor: COLORS.background,
  },

  gameName: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(1vw + 2vh)',
  },

  headerText: {
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(5vw + 2vh)',
  },
  loginButton: {
    height: '15vh',
    width: '30vw',
    backgroundColor: COLORS.landing.login,
    '&:hover': {
      backgroundColor: COLORS.landing.loginHover,
    },
  },

  buttonText: {
    color: 'white',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(2vw + 1vh)',
  },

  textField: {
    transform: 'scale(2.2)',
    width: '14vw',
  },

  textFieldTextSize: {
    fontSize: '1.5vw',
  }
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const onButtonClick = (path) => {
    history.push(path);
  }

  return (
    <div className={classes.page}>
      <Typography className={classes.gameName}>
        CONNECT 4
      </Typography>

      <Typography className={classes.headerText}>
        LOGIN
      </Typography>

      <TextField
        InputProps={{
          classes: {
            input: classes.textFieldTextSize
          },
        }}
        className={classes.textField}
        label="Username"
        variant='outlined'
      >

      </TextField>

      <TextField
        InputProps={{
          classes: {
            input: classes.textFieldTextSize
          },
        }}
        className={classes.textField}
        label="Password"
        variant='outlined'
      >

      </TextField>

      <Button
        className={classes.loginButton}
        onClick={() => onButtonClick(ROUTES.login.path)}
      >
        <Typography variant="h4" className={classes.buttonText}>
          LOGIN
        </Typography>
      </Button>
    </div>
  )
}

export default LoginPage;
