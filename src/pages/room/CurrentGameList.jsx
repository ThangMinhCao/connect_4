import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import CurrentGameCard from './CurrentGameCard';
import RoomUseStyle from './RoomPage-style';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

const CurrentGameList = ({ socket, userID }) => {
  const classes = RoomUseStyle();
  const [currentGames, setCurrentGames] = useState([]);

  useEffect(() => {
    const getCurrentGames = async () => {
      try {
        await server_api.get(ENDPOINTS.getCurrentGames, {
          headers: {
            token: localStorage.getItem('account_token')
          }
        });
      } catch (err) {
        console.log('An error occurs:', err.response)    
      }
    }
    getCurrentGames();
  }, [])

  useEffect(() => {
    socket.on(`currentGames#${userID}`, (data) => {
      // console.log(data);
      setCurrentGames(data);
    });
    return () => {
      socket.removeAllListeners(`currentGames#${userID}`);
    }
  }, [userID, socket])

  const listComparator = (game1, game2) => {
    if (game1.started && !game2.started) return -1;
    if (game2.started && !game1.started) return 1;
    if (game1.yourTurn && !game2.yourTurn) return -1;
    if (game2.yourTurn && !game1.yourTurn) return 1;
    return 1;
  }

  return (
    <Paper elevation={0} className={classes.currentGameList}>
      <List className={classes.list} cols={6}>
        {
          currentGames
            .sort(listComparator)
            .map((game) => (
              <ListItem className={classes.item} key={game.id}>
                <CurrentGameCard
                  game={game}
                  userID={userID}
                />
              </ListItem>
            )
          )
        }
      </List>
    </Paper>
  )
}

export default CurrentGameList;
