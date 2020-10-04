import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import UserDrawer from './UserDrawer';
import RoomUseStyle from './RoomPage-style';
import RoomList from './RoomList';
import RoomAppBar from './RoomAppBar'; 
import CreateRoomDialog from './CreateRoomDialog';
import CurrentGameList from './CurrentGameList';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

// import io from 'socket.io-client';

// let socket;

// const ENDPOINT = 'localhost:4000';

const RoomPage = ({ socket, userID, username, onChooseRoom }) => {
  // TODO
  /* eslint-disable */
  // const [avatar, setAvatar] = useState(DefaultAvatar);
  const [victoryNumber, setVictoryNumber] = useState(0);
  const [loseNumber, setLoseNumber] = useState(0);
  const [dialogOpened, setDialogOpened] = useState(false);
  // const [chosenUser, setChosenUser] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const classes = RoomUseStyle();

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('account_token')) {
      history.push('/login');
    }
  }, [history])

  useEffect(() => {
    const getAllGames = async () => {
      try {
        await server_api.get(ENDPOINTS.getRoomList);
        // setRoomList(response.data.games)
      } catch (err) {
        console.log('An error occurs: ', err);
      }
    }
    getAllGames();

    socket.on('allGames', (data) => {
      setRoomList(data)
    });
    return () => {
      socket.removeAllListeners('allGames');
    }
  }, [])

  return (
    <div className={classes.page}>
      {/* {renderAppBar()} */}
      <RoomAppBar
        // allPublicUsers={allPublicUsers}
        socket={socket}
        setDrawerOpened={setDrawerOpened}
        userID={userID}
        // setChosenUser={setChosenUser}
      />
      <div className={classes.body}>
        <UserDrawer
          // avatar={avatar}
          userID={userID}
          username={username}
          victoryNumber={victoryNumber}
          loseNumber={loseNumber}
          // currentGamesNumber={currentGames.length}
          open={drawerOpened}
          setOpen={setDrawerOpened}
          className={classes.drawer}
        />
        <div className={classes.content}>
          <CurrentGameList socket={socket} userID={userID} />
          <RoomList onChooseRoom={onChooseRoom} roomList={roomList} userID={userID} />
          <Fab
            className={classes.addButton}
            onClick={() => setDialogOpened(true)}
          >
            <AddIcon style={{ color: 'white' }} />
          </Fab>
          <CreateRoomDialog
            open={dialogOpened}
            handleClose={() => setDialogOpened(false)}
            handleOpen={() => setDialogOpened(true)}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomPage;
