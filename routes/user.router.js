// eslint-disable-next-line new-cap
const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');
const {userRoles} = require('../configs');

router.get('/', userController.getUsers);

router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.get('/:user_id',
    userMiddleware.getUserByIdMiddleware,
    userController.getUserById);

router.delete('/:user_id',
    userMiddleware.getUserByIdMiddleware,
    userMiddleware.checkUserRole([
        userRoles.USER,
        userRoles.ADMIN
    ]),
    userController.deleteUser);

router.put('/:user_id',
    userMiddleware.isUpdateUserBodyValid,
    userMiddleware.getUserByIdMiddleware,
    userMiddleware.checkUserRole([
        userRoles.USER,
        userRoles.ADMIN
    ]),
    userController.updateUser);

module.exports = router;
