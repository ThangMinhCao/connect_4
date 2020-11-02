import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const useStyles = makeStyles({
  title: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: FONTS.pixel,
  },

  text: {
    fontSize: 'calc(1vw + 1vh)',
    fontFamily: FONTS.pixel,
  },

  textSmall: {
    fontSize: 'calc(0.6vw + 0.6vh)',
    fontFamily: FONTS.pixel,
  },

  textVersus: {
    fontSize: 'calc(0.7vw + 0.7vh)',
    fontFamily: FONTS.pixel,
  },

  avatar: {
    border: '5px solid white',
    height: 'calc(5vw + 1.2vh)',
    width: 'calc(5vw + 1.2vh)',
    fontSize: '3vw',
    backgroundColor: `#${((1<<24)*Math.random()|0).toString(16)}`,
  },

  titleText: {
    flex: 1,
    paddingLeft: 'calc(1.2vw + 1.2vh)',
    fontSize: 'calc(1.5vw + 1.5vh)',
    fontWeight: 'bolder',
  },

  summary: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'calc(0.8vw + 0.6vh)',
    alignItems: 'end',
  },

  body: {
    display: 'flex',
    flexDirection: 'row',
  },

  bodyText: {
    fontSize: 'calc(1vw + 1vh)',
    fontFamily: FONTS.pixel,
    fontWeight: 'bolder',
  },

  history: {
    flex: 1,
  },

  winHistory: {
    backgroundColor: COLORS.historyGame.win,
    '&:hover': {
      backgroundColor: COLORS.historyGame.winHover,
    }
  },

  loseHistory: {
    backgroundColor: COLORS.historyGame.lose,
    '&:hover': {
      backgroundColor: COLORS.historyGame.loseHover,
    }
  },

  tieHistory: {
    backgroundColor: COLORS.historyGame.tie,
    '&:hover': {
      backgroundColor: COLORS.historyGame.tieHover,
    }
  },

  currentGames: {
    paddingLeft: 20,
    flex: 2,
  },

  currentGameList: {
    maxHeight: 700,
    overflow: 'auto',
  },

})

const UserInfoDialog = forwardRef(({ user, currentUserID, currentGames }, ref) => {
  // const { user, currentUserID } = props;
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const handleClose = () => {
    setOpened(false);
  }
  const handleOpen = () => setOpened(true);

  const handleSendFriendRequest = async () => {
    // console.log(currentUserID);
    try {
      await server_api.post(ENDPOINTS.sendFriendRequest, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  const handleAcceptFriendRequest = async () => {
    try {
      await server_api.post(ENDPOINTS.acceptFriendRequest, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  const handleRejectFriendRequest = async () => {
    try {
      await server_api.post(ENDPOINTS.rejectFriendRequest, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  const handleCancelFriendRequest = async () => {
    try {
      await server_api.post(ENDPOINTS.cancelFriendRequest, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  const handleUnfriend = async () => {
    try {
      await server_api.post(ENDPOINTS.unfriend, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  useImperativeHandle (ref, () => ({
    handleOpenDialog() {handleOpen()}
  }));

  const renderAddFriendButton = () => {
    if (!user || currentUserID === user.id) return;
    if (user.friends.includes(currentUserID)) {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUnfriend}
        >
          Unfriend
        </Button>
      )
    } else if(user.sentFriendRequests.includes(currentUserID)) {
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptFriendRequest}
          >
            Accept friend request
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRejectFriendRequest}
          >
            Reject friend request
          </Button>
        </>
      )
    } else if (user.comingFriendRequests.includes(currentUserID)) {
      return (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancelFriendRequest}
        >
          Cancel friend request
        </Button>
      )
    }
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendFriendRequest}
      >
        Add friend
      </Button>
    )
  }

  const getVersusText = (game) => {
    const playerFiltered = game.players.filter(player => player.id !== user.id);
    return playerFiltered[0] ? playerFiltered[0].username : 'Waiting';
  }

  if (!currentGames) {
    return <div />
  }
  
  const renderDialog = () => {
    if (user) {
      return (
        <Dialog
          maxWidth="lg"
          fullWidth
          open={opened}
          PaperProps={{
            style: {
              backgroundColor: COLORS.background,
              height: 950
            }
          }}
          onClose={handleClose}
        >
          <DialogTitle>
            <div className={classes.title}>
              <Avatar className={classes.avatar}>T</Avatar>
              <span className={classes.titleText}>{user.username}</span>
              <span className={classes.summary}>
                <span>
                  <b>Game played</b>: {user.wins + user.loses}
                </span>
                <span>
                  <b>Winrate</b>: { !user.wins ? 0 : !user.loses ? 100 : (user.wins / user.loses)}%
                </span>
              </span>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.body}>
              <div className={classes.history}>
                <span className={classes.bodyText}><b>History</b></span>
                <List style={{ maxHeight: 700, overflow: 'auto' }}>
                  {
                    user.gameHistory.map((game, index) => (
                      <ListItem
                        button
                        className={
                          game.winner === '' 
                            ? classes.tieHistory
                            : game.winner === user.id ? classes.winHistory : classes.loseHistory
                        }
                        key={index}
                      >
                        <div>
                          <p className={classes.text}>
                            {game.name}
                          </p>

                          <p className={classes.textVersus}>
                            vs. {getVersusText(game)}
                          </p>

                          <p className={classes.textVersus}>
                            {
                              game.winner === ''
                              ? "TIE"
                              : game.winner === user.id ? "WIN" : "LOSE"
                            }
                          </p>
                        </div>
                      </ListItem>
                    ))
                  }
                </List>
              </div>
              <Divider orientation="vertical" flexItem/>
              <div className={classes.currentGames}>
                <span className={classes.bodyText}><b>Current Games</b></span>
                <List className={classes.currentGameList}>
                  {
                    currentGames.filter(game => game.started).map((game, index) => (
                      <div key={index + user.id}>
                        <ListItem style={{ flexDirection: 'column', alignItems: 'flex-start' }} button>
                          <p className={classes.text}>
                            Name: {game.name} <br/>
                          </p>
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between'
                            }}
                          >
                            <p className={classes.textSmall}>
                              ID: {game.id}
                            </p>
                            <p className={classes.textSmall}>
                              Opponent: {getVersusText(game)} <br/>
                            </p>
                          </div>
                        </ListItem>
                        <Divider />
                      </div>
                    ))
                  }
                </List>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Close
            </Button>
            {renderAddFriendButton()}
          </DialogActions>
        </Dialog>
      )
    }
    return <div />;
  }
  return (
    renderDialog()
  )
});

export default UserInfoDialog;
