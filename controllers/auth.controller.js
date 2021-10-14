const User = require('../dataBase/User');
const {userNormalizator} = require('../util/user.util');

module.exports = {
    login: (req, res) => {
        try {
            const {user} = req;
            const userNormalized = userNormalizator(user);

            res.json(userNormalized);
        } catch (e) {
            res.json(e);
        }
    },

    logout: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },
};
