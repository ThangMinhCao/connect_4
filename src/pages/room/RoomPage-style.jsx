import { makeStyles } from '@material-ui/core/styles';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const RoomUseStyles = makeStyles((theme) => ({
  page: {
    // backgroundColor: COLORS.background,
    display: 'flex',
  },

  appBar: {
    // display: 'flex',
    height: 75,
    backgroundColor: COLORS.startGame,
    // justifyContent: 'left',
    alignItems: 'center',
    // zIndex: theme.zIndex.drawer + 1,
  },

  drawer: {
    width: 350,
    flexShrink: 0,
  },

  text: {
    fontFamily: FONTS.pixel,
  },

  gameText:{
    flex: 1,
    fontSize: 25,
    textAlign: 'center'
  },

  body: {
    display: 'flex',
    fontFamily: FONTS.pixel,
    paddingTop: 80,
    flexGrow: 1,
    padding: 10,
  },

  content: {
    width: 'calc(100vw - 20px)',
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
    height: '230px',
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