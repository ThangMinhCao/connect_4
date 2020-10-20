import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const useStyles = makeStyles({
  card: {
    height: 150,
    width: 400,
    borderRadius: 15,
    backgroundColor: ({ yourTurn, started, playerNum, youAreOwner }) => {
      if (!started) {
        return playerNum === 2 && youAreOwner
          ? COLORS.gameCard.ready
          : COLORS.gameCard.waiting;
      } else if (yourTurn) {
        return COLORS.gameCard.yourTurn;
      }
      return COLORS.gameCard.opponentTurn;
    },
  },

  cardButton: {
    width: '100%',
    height: '100%',
    transition: '0.5s ease-out',
    '&:hover': {
      background: 'white',
      transition: '0.5s ease-out',
    },
  },

  cardText: {
    fontFamily: FONTS.pixel,
    fontSize: 'calc(0.2vw + 0.5vh + 12px)',
  },

  cardState: {
    fontFamily: FONTS.pixel,
    fontSize: 'calc(0.6vw + 1vh + 12px)',
    textDecoration: 'underline'
  },

  roomName: {
    fontFamily: FONTS.pixel,
    position: 'absolute',
    top: 10,
    left: 15,
    fontSize: 12,
    maxWidth: 140,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
});

const CurrentGameCard = ({
  game, userID
}) => {
  const history = useHistory();

  const checkYourTurn = () => {
    return game.currentPlayer.id === userID; 
  }

  const classes = useStyles({
    yourTurn: checkYourTurn(),
    started: game.started,
    playerNum: game.players.length,
    youAreOwner: game.owner.ownerID === userID,
  });

  const getOpponentName = () => {
    const opponentName = game.players.filter((player) => player.id !== userID)[0];
    return opponentName ? opponentName.username : '';
  }

  const opponentName = getOpponentName(); 

  // reload when click back
  useEffect(() => {
    window.onpopstate = e => {
      history.go(0);
    }
  })

  const handleGoToRoom = () => {
    history.push({
      pathname: '/ingame',
      state: { roomID: game.id }
    });
    history.go(0);
  }

  const renderGameState = () => {
    let text;
    if (!game.started) {
      text = game.players.length === 1 || game.owner.ownerID !== userID ? 'Waiting' : 'Ready';
    } else if (checkYourTurn()) {
      text = "Your Turn";
    } else {
      text = "Opponent's Turn";
    }
    return (
      <Typography className={classes.cardState} variant='h5'>
        {text}
      </Typography>
    )
  }

  return (
    <Card className={classes.card} elevation={5}>
      <ButtonBase className={classes.cardButton} onClick={handleGoToRoom}>
        <CardContent >
          <Typography className={classes.roomName}>{game.name}</Typography>
          <Typography className={classes.cardText} variant='h5'>
            vs.
          </Typography>

          <Typography className={classes.cardText} variant='h5'>
            {opponentName ? opponentName : '..........'} 
          </Typography>
          {renderGameState()}
        </CardContent>
      </ButtonBase>
    </Card>
  )
}

export default CurrentGameCard;

