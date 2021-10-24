const {ErrorHandler} = require('../errors/ErrorHandler');
const {emailService, jwtService, passwordService} = require('../services');
const {constants, errorStatus, errorMessages, actionTokenTypeEnum, emailActionEnum} = require('../configs');
const {O_Auth, User, ActionToken} = require('../dataBase');
const {userNormalizator} = require('../util/user.util');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            await user.comparePassword(req.body.password);

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({...tokenPair, user_id: userNormalized._id});

            await emailService.sendMail(userNormalized.email, emailActionEnum.LOGIN, {userName: userNormalized.name});

            res.json({user: userNormalized, ...tokenPair});
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const {user} = req;

            await O_Auth.deleteOne({access_token: token}, {new: true});

            res.json(`User ${user.name} logout!`);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {token} = req;

            const tokenPair = jwtService.generateTokenPair();

            const newTokenPair = await O_Auth.findOneAndUpdate({token}, {...tokenPair}, {new: true});

            res.json(newTokenPair);
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(errorMessages.USER_NOT_FOUND, errorStatus.STATUS_404);
            }

            const actionToken = await jwtService.generateActionToken(actionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: actionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, {forgotPasswordUrl: `http://localhost:3000/passwordForgot?token=${actionToken}`});

            res.json('message sent to email').status(errorStatus.STATUS_201);
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);
            const {newPassword} = req.body;

            if (!actionToken) {
                throw new ErrorHandler(errorMessages.INVALID_TOKEN, errorStatus.STATUS_401);
            }

            await jwtService.verifyActionToken(actionToken, actionTokenTypeEnum.FORGOT_PASSWORD);

            const hashedPassword = await passwordService.hash(newPassword);

            const updateUserPassword = await User.findOneAndUpdate({actionToken}, {password: hashedPassword}, {new: true});

            await emailService.sendMail(updateUserPassword.email, emailActionEnum.NEW_PASSWORD_AFTER_FORGOT, {
                userName: updateUserPassword.name
            });

            res.json('Password update!!!').status(errorStatus.STATUS_201);
        } catch (e) {
            next(e);
        }
    }
};
