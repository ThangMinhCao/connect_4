import React from 'react';
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
  opponentName, yourTurn, started
}) => {
  const classes = useStyles({ yourTurn, started });

  const renderGameState = () => {
    let text;
    if (!started) {
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

