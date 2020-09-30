import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RoomUseStyle from './RoomPage-style';
import Avatar from '@material-ui/core/Avatar';
import FriendListMenu from './FriendListMenu';

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
})

const RoomAppBar = ({ socket, setDrawerOpened, allPublicUsers, userDialogRef, setChosenUser }) => {
  const classes = RoomUseStyle();
  const internalClasses = AppBarUseStyles();
  // const [text, setText] = useState('');

  const handleChooseUser = (event, value) => {
    setChosenUser(value);
    userDialogRef.current.handleOpenDialog();
    // setText('');
  }

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
            renderOption={(user) => (
              <>
                <Avatar>{user.username[0].toUpperCase()}</Avatar>
                <span style={{ paddingLeft: 20 }}>
                  {user.username}
                </span>
              </>
            )}
            onKeyPress={e => {
              if (e.key === 'Enter') return null;
            }}
            onChange={handleChooseUser}
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
        <FriendListMenu iconClassName={internalClasses.profileIcon} />
      </Toolbar>
    </AppBar>
  )
} 

export default RoomAppBar;