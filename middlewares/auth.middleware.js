const {authValidator} = require('../validators');
const {ErrorHandler} = require('../errors/ErrorHandler');
const {errorStatus, errorMessages, constants, tokenTypeEnum} = require('../configs');
const {O_Auth} = require('../dataBase');
const {jwtService} = require('../services');

module.exports = {
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
    },

    checkAuthToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth.findOne({access_token: token}).populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
            }

            await jwtService.verifyToken(token, tokenTypeEnum.REFRESH);

            const tokenResponse = await O_Auth.findOne({refresh_token: token});

            if (!tokenResponse) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
            }

            await O_Auth.remove({refresh_token: token});

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
