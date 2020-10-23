"use strict";

var router = require('express').Router();

var userController = require('../controllers/user/userController');

var auth = require('../middlewares/userAuth');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.put('/logout', auth.verifyToken, userController.logout);
router.get('/verifyUser', auth.verifyToken, userController.getUserFromToken);
router.get('/', userController.getAllUsers);
router.get('/friendList', auth.verifyToken, userController.getFriendList);
router.get('/friendRequests', auth.verifyToken, userController.getFriendRequests);
router.post('/sendFriendRequest', auth.verifyToken, userController.sendFriendRequest);
router.post('/acceptFriendRequest', auth.verifyToken, userController.acceptFriendRequest);
router.post('/cancelFriendRequest', auth.verifyToken, userController.cancelFriendRequest);
router.post('/rejectFriendRequest', auth.verifyToken, userController.rejectFriendRequest);
router.post('/unfriend', auth.verifyToken, userController.unfriend); // router.get('/:id', )

module.exports = router;