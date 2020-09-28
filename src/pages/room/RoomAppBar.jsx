import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GroupIcon from '@material-ui/icons/Group';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RoomUseStyle from './RoomPage-style';
import Avatar from '@material-ui/core/Avatar';

// import server_api from '../../api/server_api';
// import ENDPOINTS from '../../constants/endpoints';

const RoomAppBar = ({ socket, setDrawerOpened, allPublicUsers, userDialogRef, setChosenUser }) => {
  const classes = RoomUseStyle();
  // const [text, setText] = useState('');

  const handleChooseUser = (event, value) => {
    setChosenUser(value);
    userDialogRef.current.handleOpenDialog();
    // setText('');
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.appBar}>
        <IconButton
          onClick={() => setDrawerOpened(true)}
        >
          <ChevronRightIcon
            fontSize='large'
            style={{ color: 'white' }}
          />
        </IconButton>
        <Autocomplete
          freeSolo
          disableClearable
          options={allPublicUsers}
          getOptionLabel={(user) => user.username}
          renderOption={(user) => (
            <>
              <Avatar>{user.username[0].toUpperCase()}</Avatar>
              <span style={{ paddingLeft: 20 }}>
                {user.username}
              </span>
            </>
          )}
          style={{ flex: 1, minWidth: 250, }}
          onChange={handleChooseUser}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a user"
              margin="dense"
              variant="filled"
              style={{ backgroundColor: 'white' }}
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
        <Typography className={`${classes.text} ${classes.gameText}`}>
          Connect 4
        </Typography>
        <IconButton>
          <GroupIcon fontSize="large" style={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
} 

export default RoomAppBar;