const router = require('express').Router();
const userController = require('../controllers/user/userController');
const auth = require('../middlewares/userAuth'); 

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/verifyUser', auth.verifyToken, userController.getUserFromToken);

// router.get('/:id', )

module.exports = router;
