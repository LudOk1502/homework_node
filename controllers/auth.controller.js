const O_Auth = require('../dataBase/O_Auth');
const {userNormalizator} = require('../util/user.util');
const {jwtService} = require('../services');
const {constants} = require('../configs');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizator(user);

            await O_Auth.create({...tokenPair, user_id: userNormalized._id});

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
    }
};
