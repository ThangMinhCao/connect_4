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
    // zIndex: theme.zIndex.drawer + 1,
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
    borderBottom: '5px solid'
  },

  body: {
    display: 'flex',
    fontFamily: FONTS.pixel,
    paddingTop: 80,
    flexGrow: 1,
    padding: 10,
  },

  content: {
    width: 'calc(100vw - 385px)',
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
    height: '200px',
    overflow: 'auto',
    background: 'transparent',
  },

  list: {
    display: 'flex',
  },

  item: {
    flex: 0,
  },

  addButton: {
    position: 'fixed',
    bottom: '2vh',
    right: '2vh',
    backgroundColor: 'rgba(129, 163, 82, 0.5)',
    border: `2px solid ${COLORS.room.addButtonHover}`,
    '&:hover': {
      backgroundColor: COLORS.room.addButtonHover,
      border: `2px solid ${COLORS.room.addButtonHover}`,
      opacity: 1,
    }
  },
}));

export default RoomUseStyles;