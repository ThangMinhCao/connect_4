import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import COLORS from '../../constants/colors';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

const useStyles = makeStyles((theme) => ({
  box: {
    height: '600px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  title: {
    width: '100%',
    height: '30px',
    textAlign: 'center',
    paddingTop: '15px',
    backgroundColor: COLORS.game.yourTurn,
  },

  messagesList: {
    flexGrow: 1,
    overflowY: 'scroll',
    maxHeight: 500
  },

  opponentMessageBox: {
    backgroundColor: '#B80000',
    width: '280px',
    borderRadius: 20,
    marginLeft: 100,
    marginBottom: 10,
  },

  yourMessageBox: {
    backgroundColor: '#8FB78F',
    width: '280px',
    borderRadius: 20,
    marginRight: 100,
    marginBottom: 10,
  },

  opponentMessage: {
    textAlign: 'right',
    color: 'white'
  },

  yourMessage: {
    textAlign: 'left',
  },

  form: {
    width: 400,
    flexDirection: 'row'
  },
}));

const ChatBox = ({userID, roomID, messages}) => {
  const classes = useStyles();
  const scrollRef = useRef(null);
  const [currentMessage, setCurrentMessage] = useState('');
  // const [messages, setMessages] = useState([]);

  const handleSendMessage = async (event) => {
    event.preventDefault(); 
    console.log(userID);
    if (currentMessage) {
      try {
        await server_api.post(ENDPOINTS.sendMessages,
        {
          roomID,
          message: currentMessage
        },
        {
          headers: {
            token: localStorage.getItem('account_token')
          }, 
        });
      } catch (err) {
        console.log('An error occurs: ', err.response.data);
      }
    }
    setCurrentMessage('');
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  const renderMessages = () => {
    if (messages) {
      return (
        messages.map((message, index) => (
          <ListItem
            key={index}
            className={message.sender === userID ? classes.yourMessageBox : classes.opponentMessageBox}
          >
            <ListItemText
              ref={index === messages.length - 1 ? scrollRef : null}
              className={message.sender === userID ? classes.yourMessage : classes.opponentMessage}
            >
              {message.content}
            </ListItemText>
          </ListItem>
        ))
      );
    }
    return (<div />);
  }

  return (
    <Paper elevation={5} className={classes.box}>
      <div className={classes.title}>
        Chat Box
      </div>
      <Paper className={classes.messagesList}>
        <List style={{maxHeight: 500}}>
          {renderMessages()}
        </List>
      </Paper>
      <form onSubmit={handleSendMessage} className={classes.form}>
        <TextField
          style={{ width: 350 }}
          variant="outlined"
          onChange={(event) => setCurrentMessage(event.target.value)}
          value={currentMessage}
        />
        <IconButton type="submit">
          <SendIcon color="primary" />
        </IconButton>
      </form>
    </Paper>
  )
}

export default ChatBox;