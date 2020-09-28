import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RoomUseStyle from './RoomPage-style';

const UserDrawer = ({
  avatar, userID, username, victoryNumber, loseNumber, currentGamesNumber
}) => {
  const classes = RoomUseStyle();

  return (
    <Drawer
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      variant="permanent"
      anchor='left'
    >
      <Toolbar />
      <img 
        className={classes.avatar}
        src={avatar}
        alt="Avatar"
      />
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
    </Drawer>
  )
}

export default UserDrawer;
