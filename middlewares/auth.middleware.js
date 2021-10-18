const passwordService = require('../services/password.service');
const {authValidator} = require('../validators');
const {ErrorHandler} = require('../errors/ErrorHandler');
const {errorStatus, errorMessages} = require('../configs');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await passwordService.compare(password, hashPassword);
            next();
        } catch (e) {
            next(e);
        }
    },

    isAuthUserBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.authUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorMessages.BAD_REQUEST, errorStatus.STATUS_400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};


