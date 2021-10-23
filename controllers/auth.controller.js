const {emailService} = require('../services');
const {constants, errorMessages, errorStatus} = require('../configs');
const {jwtService} = require('../services');
const {LOGIN} = require('../configs/email-action.enum');
const {O_Auth, User} = require('../dataBase');
const {userNormalizator} = require('../util/user.util');


module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({...tokenPair, user_id: userNormalized._id});

            await emailService.sendMail(userNormalized.email, LOGIN, {userName: userNormalized.name});

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

    activate: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await User.updateOne({_id}, {is_active: true});

            res.json(errorMessages.USER_IS_ACTIVE).status(errorStatus.STATUS_200);
        } catch (e) {
            next(e);
        }
    }
};
