import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import FONTS from '../../constants/fonts';
// import Paper from '@material-ui/core/Paper';
import COLORS from '../../constants/colors';

const useStyles = makeStyles({
  room: {
    display: 'flex',
    flexDirection: 'row',
  },

  roomList: {
    maxHeight: 'calc(100vh - 310px)',
    overflow: 'auto',
  },

  roomName: {
    flex: 1,
  },

  toolbar: {
    color: 'white',
    // backgroundColor: '#156CA2',
    backgroundColor: COLORS.room.searchBar.bar,
  },

  inputRoot: {
    fontFamily: FONTS.pixel,
    fontSize: 20,
    paddingLeft: 15,
    borderRadius: 7,
    color: 'white',
    // backgroundColor: '#1479B8',
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
    textDecoration: 'underline',
    color: '#DF2935',
  },

  ownerTag: {
    marginRight: 10,
    textDecoration: 'underline',
    color: '#09814A',
  }
});

const RoomList = ({ roomList }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  // TODO
  // const handleChooseRoom = (roomID) => {
  // }

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
              room.name.includes(searchTerm)
              || room.owner.includes(searchTerm)
              || room.id.includes(searchTerm)
            );
          }
          return true;
        })
        .map((room, index) => (
          <div key={room.id}>
            <ListItem
              button
              // TODO onClick={() => console.log(123123)}
            >
              <p className={classes.roomNameTag}>
                Name: 
              </p>
              <p className={classes.roomName}>
                {room.name}
              </p>
              {generateNameDivider()}
              <p className={classes.idTag}>
                ID: 
              </p>
              <p className={classes.roomID}>
                {room.id}
              </p>
              {generateNameDivider()}
              <p className={classes.ownerTag}>
                Owner: 
              </p>
              <p>
                {room.owner}
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

      <List className={classes.roomList}>
        <Divider />
        {renderRoomListItems()}
      </List>
    </>
  )
}

export default RoomList;

