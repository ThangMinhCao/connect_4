const router = require('express').Router();
const gameRoomController = require('../controllers/game/gameRoomController');

const auth = require('../middlewares/userAuthorization'); 

router.post('/create', auth, gameRoomController.createNewRoom);

module.exports = router;

