const router = require('express').Router();
const userController = require('../controllers/user/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);

// router.get('/:id', )

module.exports = router;
