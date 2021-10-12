// eslint-disable-next-line new-cap
const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/',
    userMiddleware.isUserPresent,
    authMiddleware.isPasswordsMatched,
    authController.login);
router.post('/logout', authController.logout);

module.exports = router;

