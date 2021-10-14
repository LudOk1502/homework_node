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
            next(e);
        }
    },

    getUserByIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new Error('User not found');
            }

            req.json = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new Error('Wrong email or password!');
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.creatUserValidator.validate(req.body);


            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
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
            next(e);
        }
    }
};
