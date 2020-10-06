import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import COLORS from '../../constants/colors';

import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: COLORS.game.startDialog
  },

  headerText: {
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(7vw + 2vh)',
    color: '#F3D34A',
  },

  opponentTitle: {
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(3vw + 1vh)',
    height: 10,
    color: '#FD885E',
    textDecoration: 'underline',
  },

  opponent: {
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(5vw + 1vh)',
    color: '#F2B592',
  },

  button: {
    height: '25vh',
    width: '50vw',
  },

  startButton: {
    border: '15px solid white',
    backgroundColor: '#F3D34A',
    color: 'black',
    '&:hover': {
      backgroundColor: '#074A35',
      color: 'white',
    },
  },

  buttonText: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(2vw + 2vh)',
  },
});

const StartGameDialog = ({ game, userID }) => {
  const classes = useStyles();

  const checkTwoPlayerJoined = () => {
    return game.players && game.players.length === 2;
  }

  const checkedButtonAvailable = () => {
    return checkTwoPlayerJoined() && game.owner.ownerID === userID;
  }

  // const checkOwner = () => {
  //   return game.owner.ownerID === userID;
  // }

  const getOpponent = () => {
    if (checkTwoPlayerJoined()) {
      return game.players.filter(player => player.id !== userID)[0].username;
    }
    return '......';
  }

  const handleStartGame = async() => {
    try {
      await server_api.put(ENDPOINTS.startGame, {
        params: {
          roomID: game.id
        }
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
    } catch (err) {
      console.log('An error occurs: ', err.response.data.message);
    }
  }

  const renderDialog = () => {
    if (!game) return <div />;
    return (
      <Dialog fullScreen open={!game.started}>
        <div className={classes.page}>
          <Typography className={classes.headerText}>
            {game.name}  
          </Typography>
          <Typography className={classes.opponentTitle}>
            Opponent:
          </Typography>
          <Typography className={classes.opponent}>
            {getOpponent()}
          </Typography>
          <Button
            className={`${classes.button} ${classes.startButton}`}
            disabled={!checkedButtonAvailable()}
            onClick={handleStartGame}
          >
            <Typography variant="h4" className={classes.buttonText}>
              {checkedButtonAvailable() ? 'START GAME' : 'WAITING'}
            </Typography>
          </Button>
        </div>
      </Dialog>
    )
  }

  return (
    renderDialog()
  )
}

export default StartGameDialog;