const passwordService = require('../services/password.service');
const authValidator = require('../validators/auth.validator');

module.exports = {
    isPasswordsMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            const passwordsMatched = await passwordService.compare(password, hashPassword);

            if (!passwordsMatched) {
                throw new Error('Passwords does not match!');
            }


            next();
        } catch (e) {
            res.json(e.message);
        }
    },
    isAuthUserBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.authUserValidator.validate(req.body);

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


