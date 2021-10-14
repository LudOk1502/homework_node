const User = require('../dataBase/User');
const {userValidator} = require('../validators');
const {ErrorHandler} = require('../errors/ErrorHandler');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new ErrorHandler('Email already exist', 404);
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
                throw new ErrorHandler('User not found', 404);
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
                throw new ErrorHandler('Wrong email or password!', 404);
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
                throw new ErrorHandler('Data not correct!', 404);
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
                throw new ErrorHandler('Data not correct', 404);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.body;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler('Access denied', 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
