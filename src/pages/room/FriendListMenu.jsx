import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
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
    maxWidth: 220,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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

const FriendListMenu = ({ userID, iconClassName, socket }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  /* eslint-disable */
  const [friendList, setFriendList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const classes = FriendListUseStyles();

  useEffect(() => {
    const getFriendListAndRequests = async() => {
      try {
        // TODO
        server_api.get(ENDPOINTS.getFriendList, {
          headers: {
            token: localStorage.getItem('account_token'),
          }
        });

        server_api.get(ENDPOINTS.getFriendRequests, {
          headers: {
            token: localStorage.getItem('account_token'),
          }
        });
      } catch (err) {
        console.log(err.response.data.message);
      }
    } 
    getFriendListAndRequests()    

    socket.on(`friendList#${userID}`, (data) => {
      setFriendList(data)
    });
    socket.on(`friendRequests#${userID}`, (data) => {
      setFriendRequests(data)
    });
    return () => {
      socket.removeAllListeners(`friendList#${userID}`);
      socket.removeAllListeners(`friendRequests#${userID}`);
    }
  }, [userID]);

  const handleAcceptFriendRequest = (requestUserID) => {
    try {
      // TODO
      server_api.post(ENDPOINTS.acceptFriendRequest, 
        {
          targetID: requestUserID
        },
        {
          headers: {
            token: localStorage.getItem('account_token'),
          },
        }
      );
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

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
            <Avatar className={classes.avatar}>{friend.username[0].toUpperCase()}</Avatar>
            <span className={classes.username}>{friend.username}</span>
            <div className={`${classes.sign} ${friend.online ? classes.online : classes.offline}`}></div>
          </MenuItem>
        ))
      )
    }
  }

  const renderFriendRequests = () => {
    if (!friendRequests.length) {
      return (
        <MenuItem disabled className={classes.friendItem}>
          No coming friend requests 
        </MenuItem>
      )
    } else {
      return(
        friendRequests.map((request, index) => (
          <MenuItem button={false} key={index} className={classes.friendItem}>
            <Avatar className={classes.avatar}>{request.username[0].toUpperCase()}</Avatar>
            <span className={classes.username}>{request.username}</span>
            <IconButton
              style={{ color: 'green' }}
              onClick={() => handleAcceptFriendRequest(request.id)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton style={{ color: 'red' }}>
              <CloseIcon />
            </IconButton>
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
        <div className={classes.title}>Friend requests</div>
        {renderFriendRequests()}
        <div className={classes.title}>Friend list</div>
        {renderFriendList()}
      </Menu>
    </div>
  )
}

export default FriendListMenu;
