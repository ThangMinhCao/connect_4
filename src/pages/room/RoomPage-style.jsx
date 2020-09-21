import { makeStyles } from '@material-ui/core/styles';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const RoomUseStyles = makeStyles((theme) => ({
  page: {
    // backgroundColor: COLORS.background,
    display: 'flex',
  },

  appBar: {
    height: 70,
    backgroundColor: COLORS.startGame,
    zIndex: theme.zIndex.drawer + 1,
  },

  drawer: {
    width: 350,
    flexShrink: 0,
  },

  text: {
    fontFamily: FONTS.pixel,
  },

  drawerPaper: {
    width: 350,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: COLORS.room.drawer,
  },

  avatar: {
    width: '200px',
    height: '200px',
    background: 'white',
    borderRadius: 200,
    border: '5px solid white',
  },

  drawerUserName: {
    fontFamily: FONTS.pixel,
    paddingTop: 15,
    color: 'white',
  },

  drawerInfo: {
    fontFamily: FONTS.pixel,
    paddingTop: 25,
    color: 'white',
  },

  body: {
    display: 'flex',
    fontFamily: FONTS.pixel,
    paddingTop: 80,
    flexGrow: 1,
    padding: 10,
  },

  content: {
    width: '100%',
  },

  card: {
    height: 150,
    width: 250,
  },

  cardButton: {
    width: '100%',
    height: '100%',
  },

  currentGameList: {
    width: 'calc(100vw - 370px)',
    overflow: 'auto',
    background: 'transparent',
  },

  list: {
    display: 'flex',
  },

  item: {
    flex: 0,
  }
}));

export default RoomUseStyles;