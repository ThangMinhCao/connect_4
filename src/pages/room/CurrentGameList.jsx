import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import CurrentGameCard from './CurrentGameCard';
import RoomUseStyle from './RoomPage-style';

const CurrentGameList = ({ userID, currentGames }) => {
  const classes = RoomUseStyle();

  const checkYourTurn = (game) => {
    return game.currentPlayer.id === userID; 
  }

  const checkReady = (game) => {
    return game.players.length === 2 && game.owner.ownerID === userID; 
  }

  // const listComparator = (game1, game2) => {
  //   if (game1.started && !game2.started) return -1;
  //   if (game2.started && !game1.started) return 1;
  //   if (game1.yourTurn && !game2.yourTurn) return -1;
  //   if (game2.yourTurn && !game1.yourTurn) return 1;
  //   return 1;
  // }

  return (
    <>
      <Paper elevation={0} className={classes.currentGameList}>
        <span>Started Current Games</span>
        <List className={classes.list} cols={6}>
          {
            currentGames
              .filter(game => game.started)
              .sort((game1, game2) => checkYourTurn(game2) - checkYourTurn(game1))
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
      <Paper elevation={0} className={classes.currentGameList}>
        <span>Not Started Games</span>
        <List className={classes.list} cols={6}>
          {
            currentGames
              .filter(game => !game.started)
              .sort((game1, game2) => checkReady(game2) - checkReady(game1))
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
    </>
  )
}

export default CurrentGameList;
