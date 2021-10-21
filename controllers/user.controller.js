const {constants} = require('../configs');
const {User, O_Auth} = require('../dataBase');
const {passwordService} = require('../services');
const {userNormalizator} = require('../util/user.util');
const {errorStatus} = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);
            const newUser = await User.create({...req.body, password: hashedPassword});

            const user = userNormalizator(newUser);

            res.json(user).status(errorStatus.STATUS_201);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            await User.deleteOne(req.user);

            await O_Auth.deleteOne({access_token: token});

            res.sendStatus(errorStatus.STATUS_204);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {name} = req.body;

            const updateUser = await User.findByIdAndUpdate({_id}, {name}, {new: true});

            res.json(updateUser).status(errorStatus.STATUS_201);
        } catch (e) {
            next(e);
        }
    }
};
