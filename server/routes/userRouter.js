const router = require('express').Router();
const userAuthController = require('../controllers/user/userAuthenticationController');

router.post('/login', userAuthController.login);
router.post('/signup', userAuthController.signup);

// router.get('/:id', )

module.exports = router;
