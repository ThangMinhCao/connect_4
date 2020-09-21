import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';
// import DISC_COLORS from '../../constants/discColors';

// const drawerWidth = '100vw';

const useStyles = makeStyles({
  drawer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '10px',
    backgroundColor: (props) => props.yourTurn ? COLORS.game.yourTurn : COLORS.game.opponentTurn,
    transition: 'all 0.5s ease',
    height: 'calc(10vh + 9vw)',
  },

  text: {
    color: (props) => props.yourTurn ? 'black' : 'white',
    fontSize: '1vw',
    transition: 'all 0.5s ease',
  },

  avatar: {
    width: '200px',
    height: '200px',
    background: 'white',
    borderRadius: 200,
    border: '5px solid white',
  },

  drawerTurnStateText: {
    fontFamily: FONTS.pixel,
    fontSize: '3.5vw',
    paddingTop: 15,
    paddingLeft: 20,
  },

  drawerTextInfo: {
    fontFamily: FONTS.pixel,
    paddingTop: 25,
  },

  drawerInfo: {
    flex: 1,
  },

  drawerTurnState: {
    flex: 1,
  },

  disc: {
    borderRadius: 100,
    border: '5px solid white',
    width: 'calc(5vh + 5vw)',
    height: 'calc(5vh + 5vw)',
    margin: 10,
    backgroundColor: (props) => props.discColor,
    transition: 'all 0.5s ease',
  }
});

const GameInfoDrawer = ({
  yourTurn, discColor, opponentDiscColor
}) => {
  const classes = useStyles({ yourTurn, discColor, opponentDiscColor });

  // useEffect(() => {
  //   console.log(opponentDiscColor);
  // }, [])

  const renderCircle = () => {
    return (
      <div className={classes.disc} />
    )
  }

  return (
    <div
      className={classes.drawer}
    >
      {renderCircle()}
      <div className={classes.drawerTurnState}>
        <Typography variant="h4" className={`${classes.text} ${classes.drawerTurnStateText}`}>
          {yourTurn ? 'Your Turn' : 'Opponent\'s Turn'} 
        </Typography>
      </div>
      <div className={classes.drawerInfo}>
        <Typography variant="h5" className={`${classes.text} ${classes.drawerTextInfo}`}>
          Loses: {0} 
        </Typography>

        <Typography variant="h5" className={`${classes.text} ${classes.drawerTextInfo}`}>
          Current: {0} 
        </Typography>
      </div>
    </div>
  )
}

export default GameInfoDrawer;
