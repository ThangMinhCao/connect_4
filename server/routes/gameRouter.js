const router = require('express').Router();
const gameController = require('../controllers/game/gameRoomController');

const auth = require('../middlewares/userAuth'); 

router.post('/create', auth.verifyToken, gameController.createNewRoom);
router.get('/', gameController.getAllGames);
router.patch('/join', auth.verifyToken, gameController.joinGame);

module.exports = router;

