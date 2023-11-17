const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/google-auth', userController.googleLog);
router.post('/twitter-auth', userController.twitterLog);

module.exports = router;
