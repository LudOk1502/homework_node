const jwt = require('jsonwebtoken');

const {ErrorHandler} = require('../errors/ErrorHandler');
const {errorMessages, errorStatus, tokenTypeEnum, config, actionTokenTypeEnum} = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeEnum.ACCESS ? config.JWT_ACCESS_SECRET : config.JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWorld = '';

        switch (actionTokenType) {
            case actionTokenTypeEnum.FORGOT_PASSWORD:
                secretWorld = config.JWT_FORGOT_PASSWORD_SECRET;
                break;

            default:
                throw new ErrorHandler(errorMessages.WRONG_TOKEN_TYPE, errorStatus.STATUS_500);
        }

        return jwt.sign({}, secretWorld, {expiresIn: '24h'});
    },

    verifyActionToken: async (token, tokenType) => {
        try {
            let secret = '';

            switch (tokenType) {
                case actionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = config.JWT_FORGOT_PASSWORD_SECRET;
                    break;

                default:
                    throw new ErrorHandler(errorMessages.WRONG_TOKEN_TYPE, errorStatus.STATUS_500);
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
        }
    }
};
