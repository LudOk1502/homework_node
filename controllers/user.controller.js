const {Action, O_Auth, User} = require('../dataBase');
const {errorStatus, constants, tokenTypeEnum} = require('../configs');
const {jwtService} = require('../services');
const {passwordService, emailService} = require('../services');
const {userNormalizator} = require('../util/user.util');
const {WELCOME, DELETE, UPDATE} = require('../configs/email-action.enum');


module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const user = userNormalizator(newUser);

            const token = jwtService.createActionToken();
            await Action.create({token, type: tokenTypeEnum.ACTION, user_id: user._id});
            console.log(token, '__________');
            await emailService.sendMail(user.email, WELCOME, {userName: user.name, token});

            res.json(user).status(errorStatus.STATUS_201);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const {email, name} = req.user;

            await User.deleteOne(req.user);

            await O_Auth.deleteOne({access_token: token});

            await emailService.sendMail(email, DELETE, {userName: name});

            res.sendStatus(errorStatus.STATUS_204);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {name} = req.body;

            const updateUser = await User.findByIdAndUpdate({_id}, {name}, {new: true});

            await emailService.sendMail(updateUser.email, UPDATE, {
                userName: req.user.name,
                newUserName: updateUser.name
            });

            res.json(updateUser).status(errorStatus.STATUS_201);
        } catch (e) {
            next(e);
        }
    }
};
