import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import COLORS from '../../constants/colors';
import ROUTES from '../../routes';

const WINNER = {
  tie: 0,
  win: 1,
  lose: -1,
}

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: (winner) => winner === WINNER.tie 
                                  ? COLORS.game.tie
                                  : winner === WINNER.win 
                                    ? COLORS.game.youWin
                                    : COLORS.game.youLose,
  },

  headerText: {
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(5vw + 2vh)',
    color: (winner) => winner === WINNER.lose ? 'white' : 'black',
  },

  info: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(2vw + 1.5vh)',
    color: (winner) => winner === WINNER.lose ? 'white' : 'black',
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
}));

const EndGameDialog = ({ isGameEnd, winner, userID, movesOccured }) => {
  const [winnerState, setWinnerState] = useState(WINNER.tie);  
  const [winnerText, setWinnerText] = useState('TIE');
  const history = useHistory();
  const classes = useStyles(winnerState);

  const checkWinner = () => {
    if (!winner) {
      setWinnerState(WINNER.tie); 
      setWinnerText('TIE')
    } else if (winner === userID) {
      setWinnerState(WINNER.win); 
      setWinnerText('YOU WIN')
    } else {
      setWinnerState(WINNER.lose); 
      setWinnerText('YOU LOSE')
    }
  }

  const onExit = () => {
    history.push(ROUTES.room.path);
    history.go(0);
  }

  useEffect(() => {
    checkWinner();
  })

  return (
    <Dialog fullScreen open={isGameEnd}>
      <div className={classes.page}>
        <Typography className={classes.headerText}>
          {winnerText}
        </Typography>
        <Typography className={classes.info}>
          Moves occured: {movesOccured}
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

export default EndGameDialog;
