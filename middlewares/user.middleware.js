const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});
            if (userByEmail) {
                throw new Error('Email already exist');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    getUserByEmailAndPasswordMiddleware: async (req, res, next) => {
        try {
            const {email} = req.params;
            const user = await User.findOne({email: req.body.email, password: req.body.password});
            if (!user) {
                throw new Error('User not found');
            }
            req.json = user;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
