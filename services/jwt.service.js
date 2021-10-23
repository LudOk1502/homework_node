const jwt = require('jsonwebtoken');

const {ErrorHandler} = require('../errors/ErrorHandler');
const {errorMessages, errorStatus, tokenTypeEnum, config} = require('../configs');

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
            let secret = '';

            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;

                case tokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;

                case tokenTypeEnum.ACTION:
                    secret = config.JWT_ACTION_SECRET;
                    break;
            }

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
        }
    },

    createActionToken: () => jwt.sign({}, config.JWT_ACTION_SECRET, {expiresIn: '1d'})
};
