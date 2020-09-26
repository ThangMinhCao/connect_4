const router = require('express').Router();
const gameController = require('../controllers/game/gameController');

const auth = require('../middlewares/userAuth'); 

router.post('/create', auth.verifyToken, gameController.createNewRoom);
router.get('/', gameController.getAllGames);

module.exports = router;

