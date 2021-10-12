// eslint-disable-next-line new-cap
const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.isUserBodyValid, userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userMiddleware.getUserByIdMiddleware, userController.getUserById);
router.delete('/:user_id', userMiddleware.getUserByIdMiddleware, userController.deleteUser);
router.put('/:user_id', userMiddleware.isUpdateUserBodyValid, userController.updateUser);


module.exports = router;
