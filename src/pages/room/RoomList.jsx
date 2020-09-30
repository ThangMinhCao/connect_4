import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const useStyles = makeStyles({
  room: {
  },

  roomList: {
    overflow: 'auto',
    height: 'calc(100vh - 360px)',
  },

  roomName: {
    flex: 1,
    minWidth: 200,
    wordWrap: 'break-word',
    overflow: 'hidden',
  },

  toolbar: {
    color: 'white',
    backgroundColor: COLORS.room.searchBar.bar,
  },

  inputRoot: {
    fontFamily: FONTS.pixel,
    fontSize: 20,
    paddingLeft: 15,
    borderRadius: 7,
    color: 'white',
    backgroundColor: COLORS.room.searchBar.searchField,
  },

  searchIcon: {
    fontSize: 35,
    paddingRight: 10,
  },
  
  divider1: {
    color: '#0A54FF',
    marginLeft: 15,
  },
  divider2: {
    color: '#DF2935',
  },
  divider3: {
    color: '#09814A',
    marginRight: 15,
  },
  idTag: {
    marginRight: 10,
    textDecoration: 'underline',
    color: '#0A54FF',
  },

  roomNameTag: {
    marginRight: 10,
    marginLeft: 10,
    textDecoration: 'underline',
    color: '#DF2935',
  },

  ownerTag: {
    marginRight: 10,
    textDecoration: 'underline',
    color: '#09814A',
  },

  roomID: {
    minWidth: 150,
  },

  ownerValue: {

  }
});

const RoomList = ({ roomList, userID }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  // TODO
  // const handleChooseRoom = (roomID) => {
  // }
  const generateTooltips = (room) => {
    if (room.players.includes(userID)) {
      return { title: 'You\'re already in this room.', buttonDisabled: true };
    } else if (room.players.length === 2) {
      return { title: 'Room full', buttonDisabled: true };
    } else if (room.started) {
      return { title: 'This room is started', buttonDisabled: true };
    }
    return { title: 'Join this room', buttonDisabled: false };
  }

  const joinRoom = async (gameID) => {
    try {
      const response = await server_api.patch(ENDPOINTS.joinGame, 
        {
          params: {
            gameID,
          }
        },
        {
          headers: {
            token: localStorage.getItem('account_token'),
          }
        }
      );
      // console.log(roomList);
      console.log(response.data.message);
    } catch (err) {
      console.log('Error: ', err.response.data);  
    }
  }

  const generateNameDivider = () => {
    return (
      <>
        <p className={classes.divider1}>
          {'<'}
        </p>
        <p className={classes.divider2}>
          {'<'}
        </p>
        <p className={classes.divider3}>
          {'<'}
        </p>
      </>
    )
  }

  const renderRoomListItems = () => {
    return(
      // TODO
      roomList
        .filter((room) => {
          if (searchTerm) {
            return (
              room.name.includes(searchTerm.trim())
              || room.owner.ownerName.includes(searchTerm.trim())
              || room.id.includes(searchTerm.trim())
            );
          }
          return true;
        })
        // TODO
        .sort((room1, room2) => room1.started - room2.started)
        .map((room) => (
          <div key={room.id}>
            <ListItem
              // button
              className={classes.room}
              // TODO onClick={() => console.log(123123)}
              // onClick={() => joinRoom(room.id)}
            >
              <Tooltip
                placement="top"
                title={generateTooltips(room).title}
              >
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={generateTooltips(room).buttonDisabled}
                    onClick={() => joinRoom(room.id)}
                  >
                    <ArrowForwardIcon />
                  </Button> 
                </span>
              </Tooltip>
              <p className={classes.roomNameTag}>
                Name: 
              </p>
              <p className={classes.roomName}>
                {room.name}
              </p>
              {generateNameDivider()}
              <p className={classes.idTag}>
                RoomID: 
              </p>
              <p className={classes.roomID}>
                {room.id}
              </p>
              {generateNameDivider()}
              <p className={classes.ownerTag}>
                Owner: 
              </p>
              <p className={classes.ownerValue}>
                {room.owner.ownerName}
              </p>
            </ListItem>
            <Divider />
          </div>
        ))
    )
  }

  const handleChangeSearchField = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase 
          placeholder="Room name/ID"
          value={searchTerm}
          onChange={handleChangeSearchField}
          classes={{
            root: classes.inputRoot, 
          }}
        />
      </Toolbar>

      <List disablePadding className={classes.roomList}>
        <Divider />
        {renderRoomListItems()}
      </List>
    </>
  )
}

export default RoomList;

