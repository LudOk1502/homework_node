const User = require('../dataBase/User');
const passwordService = require('../services/password.service');
const {userNormalizator} = require('../util/user.util');

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

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findByIdAndDelete(user_id).lean();

            res.json(`${user.name} - ${user_id} - DELETE`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {name} = req.body;
            const updateUser = await User.findByIdAndUpdate({_id}, {name}, {new: true});

            res.json(updateUser);
        } catch (e) {
            next(e);
        }
    }
};
