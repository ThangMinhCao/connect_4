import { makeStyles } from '@material-ui/core/styles';
import COLORS from '../../constants/colors';

const loginUseStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    // backgroundColor: COLORS.background,
  },

  gameName: {
    position: 'absolute',
    top: '2vh',
    left: '2vw',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(1vw + 2vh)',
  },

  headerText: {
    marginTop: '10vh',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(5vw + 2vh)',
    flex: 2,
  },

  loginButton: {
    height: '15vh',
    width: '35vw',
    marginTop: '-10vh',
    backgroundColor: COLORS.landing.login,
    '&:hover': {
      backgroundColor: COLORS.landing.loginHover,
    },
  },

  signupButton: {
    flex: '0 0 10vh',
    width: '35vw',
    backgroundColor: COLORS.landing.signup,
    '&:hover': {
      backgroundColor: COLORS.landing.signupHover,
    },
    marginBottom: '5vh'
  },

  buttonText: {
    color: 'white',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: 'calc(2vw + 1vh)',
  },

  textField: {
    flex: '1 1 5vh',
    transform: 'scale(2.2)',
    width: '24vw',
  },

  textFieldTextSize: {
   fontSize: 'calc(0.9vw + 0.9vh)',
  },

  homeButton: {
    position: 'fixed',
    right: '2vw',
    top: '2vh',
  },

  homeIcon: {
    fontSize: 'calc(3vh + 3vw)',
    color: 'black',
  }
});

export default loginUseStyles;
