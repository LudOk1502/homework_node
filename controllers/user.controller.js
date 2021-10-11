const User = require('../dataBase/User');
const passwordService = require('../services/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json(e);
        }

    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findById(user_id);

            user = userUtil.userNormalizator(user);

            res.json(user);
        } catch (e) {
            res.json(e);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);
            const newUser = await User.create({...req.body, password: hashedPassword});
            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findByIdAndDelete(user_id);
            res.json(`${user.name} - ${user_id} - DELETE`);
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            let updateUser = await User.findOneAndUpdate(user_id, req.body);
            res.json(updateUser);
        } catch (e) {
            res.json(e);
        }
    },
    loginUser: async (req, res) => {
        try {
            const {user_email, user_password} = req.body;
            let user = await User.findOneAndUpdate(user_email, user_password);
            if (user) {
                res.json(`User ${user.name} login!`);
            }
            res.json('User not found');
        } catch (e) {
            res.json(e);
        }
    },
}