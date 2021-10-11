const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');

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
    },
    isUserBodyValid: (req, res, next) => {
        try {
            let {error, value} = userValidator.creatUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.json(e);
        }
    },
    isUpdateUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
