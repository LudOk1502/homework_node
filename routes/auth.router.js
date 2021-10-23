// eslint-disable-next-line new-cap
const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');

router.post('/',
    authMiddleware.isAuthUserBodyValid,
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authController.login);

router.post('/logout', authMiddleware.checkAuthToken, authController.logout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.login);

router.get('/activate/:token', authMiddleware.checkActivateToken, authController.activate);

module.exports = router;

