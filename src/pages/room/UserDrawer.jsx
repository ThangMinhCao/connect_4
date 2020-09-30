import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';
// import RoomUseStyle from './RoomPage-style';

const DrawerUseStyle = makeStyles({
  drawerPaper: {
    width: 350,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: COLORS.room.drawer,
  },

  avatar: {
    width: '150px',
    height: '150px',
    fontSize: 80,
    borderRadius: 2000,
    border: '5px solid white',
  },

  drawerUserName: {
    fontFamily: FONTS.pixel,
    paddingTop: 15,
    color: 'white',
  },

  drawerInfo: {
    fontFamily: FONTS.pixel,
    paddingTop: 25,
    color: 'white',
    borderBottom: '5px solid'
  },

  drawerCloseButton: {
    position: 'absolute',
    left: 290,
    top: 10,
  },

  gameName: {
    position: 'absolute',
    top: 30,
    fontFamily: FONTS.pixel,
    color: 'white',
  },

  logoutButton: {
    position: 'absolute',
    borderRadius: 5000,
    top: 100,
    left: 20,
  }
});

const UserDrawer = ({
  userID, username, victoryNumber, loseNumber, currentGamesNumber, open, setOpen
}) => {
  const classes = DrawerUseStyle();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('account_token');
    history.push('/');
    history.go(0);
  }

  return (
    <Drawer
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <Typography className={classes.gameName}>
        Connect 4
      </Typography>
      <IconButton
        className={classes.drawerCloseButton}
        onClick={() => setOpen(false)}
      >
        <ChevronLeftIcon fontSize='large' style={{ color: 'white' }} />
      </IconButton>
      <Toolbar />
      {/* <img 
        className={classes.avatar}
        src={avatar}
        alt="Avatar"
      /> */}
      <Avatar className={classes.avatar}>
        {username ? username[0].toUpperCase() : null}
      </Avatar>
      <Typography variant='h6' className={classes.drawerUserName}>
        {username} 
      </Typography>

      <Typography className={classes.drawerUserName}>
        ID: {userID} 
      </Typography>

      <Typography variant='h5' className={classes.drawerInfo}>
        Wins: {victoryNumber} 
      </Typography>

      <Typography variant='h5' className={classes.drawerInfo}>
        Loses: {loseNumber} 
      </Typography>

      <Typography variant='h5' className={classes.drawerInfo}>
        Current: {currentGamesNumber} 
      </Typography>
      <Tooltip title="Logout">
        <Button
          color="primary"
          variant="outlined"
          className={classes.logoutButton}
          onClick={handleLogout}
        >
          <ExitToAppIcon fontSize="large" style={{ color: 'white' }} />
        </Button>
      </Tooltip>
    </Drawer>
  )
}

export default UserDrawer;
