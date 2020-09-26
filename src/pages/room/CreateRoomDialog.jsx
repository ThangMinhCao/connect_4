import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FONTS from '../../constants/fonts';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

const dialogUseStyles = makeStyles((theme) => ({
  text: {
    fontFamily: FONTS.pixel,
  },
  normalText: {
    fontSize: 15,
  },

  title: {
    fontSize: 25,
  }
}))

const CreateRoomDialog = ({ open, handleClose, handleOpen }) => {
  const classes = dialogUseStyles();
  const [isPublic, setPublic] = useState(false);
  const [name, setName] = useState('');

  const handleSubmitCreateRoom = async (event) => {
    event.preventDefault(); 
    try {
      const response = await server_api.post(ENDPOINTS.createRoom, {
        headers: {
          token: localStorage.getItem('account_token'),
        },
        params: {
          name,
          public: isPublic,
        }
      });
    } catch (error) {
      console.log('An error occurs: ', error);  
    }
    setPublic(false);
    setName('');
    handleClose();
  }

  return (
      <Dialog
        open={open}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>
          <p className={`${classes.text} ${classes.title}`}>
            Create new game room
          </p>
        </DialogTitle>
        <DialogContent>
            <DialogContentText className={`${classes.text} ${classes.normalText}`}>
              Please enter the desired room name.
            </DialogContentText>
            <form onSubmit={handleSubmitCreateRoom}>
              <div style={{ display: 'flex' }}>
                <TextField
                  variant='filled'
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Room Name"
                  fullWidth
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    classes: {
                      input: classes.text,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.text,
                    }
                  }}
                />
                <FormControlLabel 
                  control={
                    <Switch
                      color="primary"
                      value={isPublic}
                      onChange={() => setPublic(!isPublic)}
                    />
                  }
                  labelPlacement="start"
                  label={
                    <p className={classes.text}>
                      Public 
                    </p>
                  }
                  style={{ float: 'right' }}
                />
              </div>
            <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              className={classes.text}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              color="primary"
              className={classes.text}
            >
              Create 
            </Button>
          </DialogActions>
          </form>
          </DialogContent>
      </Dialog>
  )
}

export default CreateRoomDialog;
