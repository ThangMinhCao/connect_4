const router = require('express').Router();
const gameController = require('../controllers/game/gameRoomController');
const gamePlayController = require('../controllers/game/gamePlayController');

const auth = require('../middlewares/userAuth'); 

router.post('/create', auth.verifyToken, gameController.createNewRoom);
router.get('/', gameController.getAllGames);
router.put('/join', auth.verifyToken, gameController.joinGame);
router.put('/playAMove', auth.verifyToken, gamePlayController.playAMove);
router.put('/startGame', auth.verifyToken, gameController.startGame);
router.get('/getGame', auth.verifyToken, gameController.getGame);

module.exports = router;
