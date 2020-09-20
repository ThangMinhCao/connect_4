import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Paper from '@material-ui/core/Paper';
import FONTS from '../../constants/fonts';
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
    backgroundColor: '#156CA2',
  },

  inputRoot: {
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 20,
    paddingLeft: 15,
    borderRadius: 7,
    color: 'white',
    backgroundColor: '#1479B8',
  },

  searchIcon: {
    fontSize: 35,
    paddingRight: 10,
  },
});

const RoomList = ({ roomList }) => {
  const classes = useStyles();

  // TODO
  // const handleChooseRoom = (roomID) => {

  // }

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <SearchIcon className={classes.searchIcon} />
        <InputBase 
          placeholder="name"
          classes={{
            root: classes.inputRoot, 
          }}
        />
      </Toolbar>
      <List className={classes.roomList}>
        <Divider />
        {
          roomList.map((room, index) => (
            <div key={room.id}>
              <ListItem
                button
                // TODO onClick={() => console.log(123123)}
              >
                <p>
                  {index+1}.
                </p>
                <p className={classes.roomName}>
                  {room.name}
                </p>
                <Divider orientation='vertical' />
                <p>
                  {'<<'} Owner: {room.owner} {'>>'}
                </p>
              </ListItem>
              <Divider />
            </div>
          ))
        }
      </List>
    </>
  )
}

export default RoomList;

