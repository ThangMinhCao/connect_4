import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const padding = 'calc(0.5vh + 0.5vw)';

const useStyles = makeStyles({
  drawer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '10px',
    backgroundColor: (props) => props.yourTurn ? COLORS.game.yourTurn : COLORS.game.opponentTurn,
    transition: 'all 0.5s ease',
    height: 'calc(15vh + 8vw)',
  },

  text: {
    color: (props) => props.yourTurn ? 'black' : 'white',
    marginLeft: '5vw',
    fontSize: '1.2vw',
    transform: 'scale(1.2, 1.5)',
  },

  drawerTurnStateText: {
    fontFamily: FONTS.pixel,
    fontSize: '3vw',
    paddingTop: padding,
    paddingLeft: padding,
  },

  drawerTextInfo: {
    fontFamily: FONTS.pixel,
    paddingTop: padding,
  },

  roomName: {
    fontSize: '1.2vw',
    fontFamily: FONTS.pixel,
    position: 'absolute',
    top: 20,
    right: '5vw',
  },

  drawerInfo: {
    flex: 1,
    textAlign: 'center',
  },

  drawerTurnState: {
    flex: 1,
  },

  disc: {
    borderRadius: '100vw',
    border: 'calc(0.2vw + 0.2vh) solid white',
    width: 'calc(5vh + 5vw)',
    height: 'calc(5vh + 5vw)',
    margin: padding,
    backgroundColor: (props) => props.yourTurn ? props.discColor : props.opponentDiscColor,
    transition: 'all 0.5s ease',
  },

  homeButton: {
    position: 'absolute',
    color: 'white',
    top: 10,
    left: 10,
    backgroundColor: 'black'
  }
});

const GameInfoDrawer = ({
  roomName, roomID, yourTurn, discColor, opponentDiscColor, movesPlayed
}) => {
  const classes = useStyles({ yourTurn, discColor, opponentDiscColor });
  const history = useHistory();

  const renderCircle = () => {
    return (
      <div className={classes.disc} />
    )
  }

  return (
    <div
      className={classes.drawer}
    >
      <IconButton onClick={() => history.push('/room')} className={classes.homeButton}>
        <HomeIcon />
      </IconButton>
      {renderCircle()}
      <div className={classes.drawerTurnState}>
        <Typography variant="h4" className={`${classes.text} ${classes.drawerTurnStateText}`}>
          {yourTurn ? 'Your Turn' : 'Opponent\'s Turn'} 
        </Typography>
      </div>
      <div className={classes.drawerInfo}>
        <Typography variant="h5" className={`${classes.text} ${classes.roomName}`}>
          {/* eslint-disable-next-line  */}
          Room name: {roomName} // ID: {roomID}
        </Typography>
        <Typography variant="h5" className={`${classes.text} ${classes.drawerTextInfo}`}>
          Turns played: {movesPlayed} 
        </Typography>
{/* 
        <Typography variant="h5" className={`${classes.text} ${classes.drawerTextInfo}`}>
          Current: {0} 
        </Typography> */}
      </div>
    </div>
  )
}

export default GameInfoDrawer;
