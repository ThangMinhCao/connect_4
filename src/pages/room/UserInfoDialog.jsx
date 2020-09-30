import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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
    fontSize: '3.6vw',
    fontWeight: 'bolder',
  },

  summary: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'calc(1vw + 0.6vh)',
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

  currentGames: {
    paddingLeft: 20,
    flex: 2,
  },

  currentGameList: {
    maxHeight: '45vh',
    overflow: 'auto',
  }

})

const UserInfoDialog = forwardRef(({ user, currentUserID }, ref) => {
  // const { user, currentUserID } = props;
  const classes = useStyles();
  const [opened, setOpened] = useState(false);
  const history = [
    {
      name: 'Game 1',
      win: true
    },
    {
      name: 'Game 2',
      win: false 
    },
    {
      name: 'Game 3',
      win: true
    },
    {
      name: 'Game 4',
      win: false 
    },
    {
      name: 'Game 5',
      win: true
    },
  ];
  const currentGames = ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5', 'Game 3', 'Game 4', 'Game 5'];

  const  handleClose = () => setOpened(false);
  const  handleOpen = () => setOpened(true);

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
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  // TODO
  const handleAcceptFriendRequest = async () => {
    // console.log(currentUserID);
    try {
      await server_api.post(ENDPOINTS.sendFriendRequest, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  const handleRejectFriendRequest = async () => {
    // console.log(currentUserID);
    try {
      await server_api.remove(ENDPOINTS.cancelFriendRequest, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  const handleCancelFriendRequest = async () => {
    // console.log(currentUserID);
    try {
      await server_api.remove(ENDPOINTS.cancelFriendRequest, {
        targetID: user.id,
      }, {
        headers: {
          token: localStorage.getItem('account_token')
        }
      });
    } catch (err) {
      console.log(err.response.data.message);
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
          onClick={handleSendFriendRequest}
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
            onClick={handleCancelFriendRequest}
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
  
  const renderDialog = () => {
    if (user) {
      return (
        <Dialog
          maxWidth="lg"
          fullWidth
          open={opened}
          PaperProps={{
            style: {
              backgroundColor: COLORS.background
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
                  <b>Game played</b>: 10
                </span>
                <span>
                  <b>Winrate</b>: 10%
                </span>
              </span>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className={classes.body}>
              <div className={classes.history}>
                <span className={classes.bodyText}><b>History</b></span>
                <List>
                  {
                    history.map((game, index) => (
                      <ListItem
                        button
                        className={game.win ? classes.winHistory : classes.loseHistory}
                        key={index}
                      >
                        <p className={classes.text}>
                          {game.name}
                        </p>
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
                    currentGames.map((game, index) => (
                      <ListItem button key={index}>
                        <p className={classes.text}>
                          {game}
                        </p>
                      </ListItem>
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
