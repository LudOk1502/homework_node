const passwordService = require('../services/password.service');
const {authValidator} = require('../validators');
const {ErrorHandler} = require('../errors/ErrorHandler');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            const passwordsMatched = await passwordService.compare(password, hashPassword);

            if (!passwordsMatched) {
                throw new ErrorHandler('Wrong email or password', 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isAuthUserBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.authUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler('Data not correct', 404);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};


