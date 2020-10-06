import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import COLORS from '../../constants/colors';
import ROUTES from '../../routes';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100vh',
  },

  headerText: {
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(5vw + 2vh)',
    color: 'white',
  },

  button: {
    height: '25vh',
    width: '50vw',
  },

  startButton: {
    border: '15px solid white',
    backgroundColor: '#EDF2EF',
    color: 'black',
    '&:hover': {
      backgroundColor: '#24272B',
      color: 'white',
    },
  },

  buttonText: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(2vw + 2vh)',
  },
});

const StartGameDialog = ({ game, userID }) => {
  const classes = useStyles(winnerState);

  const onExit = () => {
    history.push(ROUTES.room.path);
  }

  return (
    <Dialog fullScreen open={!game.started}>
      <div className={classes.page}>
        <Typography className={classes.headerText}>
        </Typography>
        <Button
          className={`${classes.button} ${classes.startButton}`}
          onClick={() => onExit()}
        >
          <Typography variant="h4" className={classes.buttonText}>
            EXIT
          </Typography>
        </Button>
      </div>
    </Dialog>
  )
}

export default StartGameDialog;