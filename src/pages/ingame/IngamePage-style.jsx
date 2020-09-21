
import { makeStyles } from '@material-ui/core/styles';
import FONTS from '../../constants/fonts';
import COLORS from '../../constants/colors';

const IngameUseStyle = makeStyles((theme) => ({
  page: {
    // backgroundColor: COLORS.background,
    display: 'flex',
    flexDirection: 'column',
  },

  text: {
    fontFamily: FONTS.pixel,
  },

  gameBoard: {
    fontFamily: FONTS.pixel,
    width: '100vw',
  },

  content: {
    width: '100%',
  },
}));

export default IngameUseStyle;