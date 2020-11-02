import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RoomUseStyle from './RoomPage-style';
import Avatar from '@material-ui/core/Avatar';
import UserInfoDialog from './UserInfoDialog';
import FriendListMenu from './FriendListMenu';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

// import server_api from '../../api/server_api';
// import ENDPOINTS from '../../constants/endpoints';
const AppBarUseStyles = makeStyles({
  profileIcon: {
    color: 'white',
    fontSize: 40
  },

  autoCompleteBlock: {
    flex: 1,
    paddingLeft: 5,
  },

  autoComplete: {
    minWidth: 200,
    maxWidth: 500
  },

  autoCompleteTextField: {
    backgroundColor: 'white'
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
})

const RoomAppBar = ({ socket, setDrawerOpened, userID }) => {
  const classes = RoomUseStyle();
  const internalClasses = AppBarUseStyles();
  const [allPublicUsers, setAllPublicUsers] = useState([]);
  const [chosenUser, setChosenUser] = useState(null);
  const [currentGames, setCurrentGames] = useState(null);
  const userDialogRef = useRef();

  const handleChooseUser = (user) => {
    setChosenUser(user);
    userDialogRef.current.handleOpenDialog(user);
    // setText('');
  }

  useEffect(() => {
    const getAllUsers = async() => {
      try {
        await server_api.get(ENDPOINTS.getAllUsers);
      } catch (err) {
        console.log(err)
      }
    }

    const getCurrentGames = async () => {
      try {
        const res = await server_api.get(ENDPOINTS.getCurrentGamesInfo, {
          headers: {
            token: localStorage.getItem('account_token')
          }
        });
        setCurrentGames(res.data.games);
      } catch (err) {
        console.log('An error occurs:', err)    
      }
    }

    getCurrentGames();
    getAllUsers();
    socket.on('allUsers', (data) => {
      setAllPublicUsers(data)
    });
    return () => {
      socket.removeAllListeners('allUsers');
    }
  }, [socket])

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.appBar}>
        <IconButton
          onClick={() => setDrawerOpened(true)}
        >
          <AccountCircleIcon
            fontSize='large'
            className={internalClasses.profileIcon}
          />
        </IconButton>
        <div className={internalClasses.autoCompleteBlock}>
          <Autocomplete
            className={internalClasses.autoComplete}
            disableClearable
            options={allPublicUsers}
            autoHighlight
            getOptionLabel={(user) => user.username}
            getOptionSelected={(option, value) => value.value === option.value}
            renderOption={(user) => (
              <div className={internalClasses.item} onClick={() => handleChooseUser(user)}>
                <Avatar>{user.username[0].toUpperCase()}</Avatar>
                <span style={{ paddingLeft: 20 }}>
                  {user.username}
                </span>
              </div>
            )}
            onKeyPress={e => {
              if (e.key === 'Enter') return null;
            }}
            // onChange={handleChooseUser}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a user"
                margin="dense"
                variant="filled"
                className={internalClasses.autoCompleteTextField}
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </div>
        <FriendListMenu
          userID={userID}
          iconClassName={internalClasses.profileIcon}
          socket={socket}
        />
      </Toolbar>
      <UserInfoDialog ref={userDialogRef} currentGames={currentGames} user={chosenUser} currentUserID={userID} />
    </AppBar>
  )
} 

export default RoomAppBar;