// eslint-disable-next-line new-cap
const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware, userMiddleware} = require('../middlewares');

router.post('/',
    authMiddleware.isAuthUserBodyValid,
    userMiddleware.isUserPresent,
    authController.login);

router.post('/logout', authMiddleware.checkAuthToken, authController.logout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/password/forgot', authController.sendMailForgotPassword);
router.post('/password/forgot/set', authController.setNewPasswordAfterForgot);

module.exports = router;

