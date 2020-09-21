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
    backgroundColor: (yourTurn) => yourTurn ? COLORS.gameCard.yourTurn : COLORS.gameCard.opponentTurn,
  },

  cardButton: {
    width: '100%',
    height: '100%',
    '&:hover': {
      background: 'white',
      transition: '0.5s ease-out',
    },
  },

  cardText: {
    fontFamily: FONTS.pixel,
  },
});

const CurrentGameCard = ({
  opponentName, opponentID, yourTurn 
}) => {
  const classes = useStyles(yourTurn);

  return (
    <Card className={classes.card} elevation={5}>
      <ButtonBase className={classes.cardButton}>
        <CardContent >
          <Typography className={classes.cardText} variant='h5'>
            vs.
          </Typography>

          <Typography className={classes.cardText} variant='h5'>
            {opponentName} 
          </Typography>

          <Typography className={classes.cardText}>
            ID: {opponentID} 
          </Typography>

          <Typography className={classes.cardText} variant='h5'>
            {yourTurn ? 'Your turn' : 'Opponent\'s Turn'} 
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  )
}

export default CurrentGameCard;

