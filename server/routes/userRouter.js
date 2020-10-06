const router = require('express').Router();
const userController = require('../controllers/user/userController');
const auth = require('../middlewares/userAuth'); 

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.put('/logout', auth.verifyToken, userController.logout);
router.get('/verifyUser', auth.verifyToken, userController.getUserFromToken);
router.get('/', userController.getAllUsers);
router.get('/friendList', auth.verifyToken, userController.getFriendList);
router.post('/sendFriendRequest', auth.verifyToken, userController.sendFriendRequest);
router.patch('/acceptFriendRequest', auth.verifyToken, userController.acceptFriendRequest);

// router.get('/:id', )

module.exports = router;
