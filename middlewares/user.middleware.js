const {User} = require('../dataBase');
const {userValidator} = require('../validators');
const {ErrorHandler} = require('../errors/ErrorHandler');
const {errorMessages, errorStatus} = require('../configs');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(errorMessages.EMAIL_ALREADY_EXISTS, errorStatus.STATUS_409);
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
                throw new ErrorHandler(errorMessages.USER_NOT_FOUND, errorStatus.STATUS_404);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler(errorMessages.WRONG_EMAIL_OR_PASSWORD, errorStatus.STATUS_400);
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
                throw new ErrorHandler(errorMessages.BAD_REQUEST, errorStatus.STATUS_400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorMessages.BAD_REQUEST, errorStatus.STATUS_400);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(errorMessages.ACCESS_DENIED, errorStatus.STATUS_403);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
