const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);
router.put('/', userMiddleware.getUserByEmailAndPasswordMiddleware, userController.loginUser);

router.get('/:user_id', userController.getUserById);
router.delete('/:user_id', userController.deleteUser);
router.put('/:user_id', userController.updateUser);


module.exports = router;