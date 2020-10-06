import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    backgroundColor: ({ yourTurn, started }) => {
      if (!started) {
        return COLORS.gameCard.waiting;
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
  },

  cardState: {
    fontFamily: FONTS.pixel,
    fontSize: 30,
  },
});

const CurrentGameCard = ({
  game, userID
}) => {
  const [yourTurn, setYourTurn] = useState(false);
  const classes = useStyles({ yourTurn, started: game.started });

  const getOpponentName = () => {
    const opponentName = game.players.filter((player) => player.id !== userID)[0];
    return opponentName ? opponentName.username : '';
  }

  const opponentName = getOpponentName(); 

  useEffect(() => {
    setYourTurn(userID === game.currentPlayer);

  }, [game])

  const renderGameState = () => {
    let text;
    if (!game.started) {
      text = 'Waiting';
    } else if (yourTurn) {
      text = 'Your Turn'
    } else {
      text = "Opponent's Turn"
    }
    return (
      <Typography className={classes.cardState} variant='h5'>
        {text}
      </Typography>
    )
  }

  return (
    <Card className={classes.card} elevation={5}>
      <ButtonBase className={classes.cardButton}>
        <CardContent >
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

