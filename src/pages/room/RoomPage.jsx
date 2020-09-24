import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import UserDrawer from './UserDrawer';
import CurrentGameCard from './CurrentGameCard';
import RoomUseStyle from './RoomPage-style';
import RoomList from './RoomList';
import uuid from 'shortid';
import DefaultAvatar from '../../assets/default-avatar.jpg';

import io from 'socket.io-client';

let socket;

const ENDPOINT = 'localhost:4000';

const RoomPage = () => {
  // TODO
  /* eslint-disable */
  const [avatar, setAvatar] = useState(DefaultAvatar);
  const [userID, setUserID] = useState(uuid.generate());
  const [username, setUsetName] = useState(`ID: ${userID}`);
  const [victoryNumber, setVictoryNumber] = useState(0);
  const [loseNumber, setLoseNumber] = useState(0);
  const [currentGames, setCurrentGames] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const classes = RoomUseStyle();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem('Connect4Account')));
    return () => {
    }
  }, [])

  // useEffect(() => {
  //   socket = io(ENDPOINT);
  // })

  const renderAppBar = () => {
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography>

          </Typography>
        </Toolbar>
      </AppBar>
    )
  } 

  const renderCurrentGames = () => {
    return (
      <Paper elevation={0} className={classes.currentGameList}>
        <List className={classes.list} cols={6}>
          {
            currentGames
              .sort((game1, game2) => game2.yourTurn - game1.yourTurn)
              .map((game) => (
                <ListItem className={classes.item} key={game.id}>
                  <CurrentGameCard
                    opponentName='Opponent'
                    opponentID='#opponentID'
                    yourTurn={game.yourTurn}
                  />
                </ListItem>
              )
            )
          }
        </List>
      </Paper>
    )
  }

  return (
    <div className={classes.page}>
      {renderAppBar()}
      <div className={classes.body}>
        <UserDrawer
          avatar={avatar}
          userID={userID}
          username={username}
          victoryNumber={victoryNumber}
          loseNumber={loseNumber}
          currentGamesNumber={currentGames.length}
        />
        <div className={classes.content}>
          {renderCurrentGames()}
          <RoomList roomList={roomList}/>
        </div>
      </div>
    </div>
  )
}

export default RoomPage;
