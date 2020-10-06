import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';
import FONTS from '../../constants/fonts';

const FriendListUseStyles = makeStyles({
  menu: {
    maxHeight: 500,
    minHeight: 200,
    overflow: 'auto',
  },

  username: {
    flex: 1,
    paddingLeft: 15,
    fontFamily: FONTS.pixel,
    fontSize: 15,
  },

  avatar: {
    fontFamily: FONTS.pixel,
    fontSize: 12,
  },

  friendItem: {
    display: 'flex',
    width: 350,
  },
  sign: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },

  online: {
    backgroundColor: 'green',
  },

  offline: {
    backgroundColor: '#b3b3b3',
  },

  title: {
    fontFamily: FONTS.pixel,
    fontSize: 10,
    paddingLeft: 10,
  },
})

const FriendListMenu = ({ userID, iconClassName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  /* eslint-disable */
  const [friendList, setFriendList] = useState([
    {
      username: 'Friend1',
      userID: 1251275918,
      online: true,
    },
    {
      username: 'Friend2',
      userID: 1251275918,
      online: true,
    },
    {
      username: 'Friend3',
      userID: 1251275918,
      online: false,
    },
    {
      username: 'Friend4',
      userID: 1251275918,
      online: true,
    },
    {
      username: 'Friend4',
      userID: 1251275918,
      online: true,
    },
  ]);
  const classes = FriendListUseStyles();

  useEffect(() => {
    const getFriendList = async() => {
      try {
        // TODO
        const response = server_api.get(ENDPOINTS.getFriendList, {
          headers: {
            token: localStorage.getItem('account_token'),
          }
        });
      } catch (err) {
        console.log(err.response.data.message);
      }
    } 
    getFriendList()    
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const renderFriendList = () => {
    if (!friendList.length) {
      return (
        <MenuItem disabled className={classes.friendItem}>
          Empty friend list
        </MenuItem>
      )
    } else {
      return(
        friendList.sort((friend1, friend2) => friend2.online - friend1.online).map((friend, index) => (
          <MenuItem key={index} className={classes.friendItem}>
            <Avatar className={classes.avatar}>F{index+1}</Avatar>
            <span className={classes.username}>{friend.username}</span>
            <div className={`${classes.sign} ${friend.online ? classes.online : classes.offline}`}></div>
          </MenuItem>
        ))
      )
    }
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <GroupIcon className={iconClassName} />
      </IconButton>
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        MenuListProps={{
          onMouseLeave: handleClose
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className={classes.title}>Friend list</div>
        {renderFriendList()}
      </Menu>
    </div>
  )
}

export default FriendListMenu;
