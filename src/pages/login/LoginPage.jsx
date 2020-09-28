import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import ROUTES from '../../routes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import loginUseStyles from './LoginPage-styles';
import { Base64 } from 'js-base64';
import server_api from '../../api/server_api';
import ENDPOINTS from '../../constants/endpoints';

const Labels = {
  USERNAME: 'Username',
  PASSWORD: 'Password',
}

const AlertTypes = {
  ERROR: 'error',
  SUCCESS: 'success',
}

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIng] = useState(true);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [textFieldError, setTextFieldError] = useState(false);

  const classes = loginUseStyles();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('account_token')) {
      history.push('/room');
    }
  }, [history])

  const showAlert = (type, message) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpenAlert(true);
  }

  const handleSubmitLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await server_api.post(ENDPOINTS.login, {
        username: username,
        password: Base64.encode(password),
      });

      if (response.data.error) {
        throw response.data.error;
      }
      showAlert(AlertTypes.SUCCESS, response.data.message);
      localStorage.setItem('account_token', response.data.token);
      handleLogin();
      history.push('/room');
    } catch (error) {
      console.log(error);
      showAlert(AlertTypes.ERROR, error);
      setTextFieldError(true);
    }
  }

  const handleSubmitSignup = async (event) => {
    // send a post request to signup user
    try {
      event.preventDefault();
      const response = await server_api.post(ENDPOINTS.signup, {
        username,
        password: Base64.encode(password),
      });
      if (response.data.error) {
        throw response.data.error;
      }
      showAlert(AlertTypes.SUCCESS, response.data.message);
    } catch (error) {
      showAlert(AlertTypes.ERROR, error);
      setTextFieldError(true);
    }
  }

  const handleBackHome = () => {
    history.push('/');
    // handleLogin();
    history.go(0);
  }

  const onChangeUsername = (e) => {setUsername(e.target.value)};
  const onChangePassword = (e) => {setPassword(e.target.value)};

  const handleCloseAlert = (event, reason) => {
    setOpenAlert(false);
  };

  const renderTextField = (label, onChangeFunction, value) => {
    return (
      <TextField
        InputProps={{
          classes: {
            input: classes.textFieldTextSize
          },
        }}
        InputLabelProps={{
          classes: {
            root: classes.textFieldTextSize
          }
        }}
        error={textFieldError}
        className={classes.textField}
        label={label}
        type={label === Labels.USERNAME ? 'text' : 'password'}
        value={value}
        onChange={onChangeFunction}
        required
      />
    )
  }

  return (
    <form onSubmit={loggingIn ? handleSubmitLogin : handleSubmitSignup} className={classes.page}>
      <Typography className={classes.gameName}>
        CONNECT 4
      </Typography>
      <IconButton onClick={handleBackHome} className={classes.homeButton}>
        <HomeIcon className={classes.homeIcon} />
      </IconButton>
      <Typography className={classes.headerText}>
        LOGIN
      </Typography>
      {renderTextField(Labels.USERNAME, onChangeUsername, username)}
      {renderTextField(Labels.PASSWORD, onChangePassword, password)}
      <Button
        type='submit'
        className={classes.loginButton}
        onClick={() => setLoggingIng(true)}
      >
        <Typography variant="h4" className={classes.buttonText}>
          LOGIN
        </Typography>
      </Button>
      <Button
        type='submit'
        className={classes.signupButton}
        onClick={() => setLoggingIng(false)}
      >
        <Typography variant="h4" className={classes.buttonText}>
          SIGNUP 
        </Typography>
      </Button>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={alertType}>{alertMessage}</Alert>
      </Snackbar>
    </form>
  )
}

export default LoginPage;
