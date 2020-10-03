import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import CurrentGameCard from './CurrentGameCard';
import RoomUseStyle from './RoomPage-style';

const CurrentGameList = ({ currentGames, userID }) => {
  const classes = RoomUseStyle();

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
                  opponentName={game.opponentName}
                  yourTurn={game.yourTurn}
                  started={game.started}
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
