const Joi = require('joi');

const {userRoles, constants} = require('../configs');

const creatUserValidator = Joi.object({
    name: Joi.string().alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi.string()
        .regex(constants.EMAIL_REGEXP)
        .required(),
    role: Joi.string()
        .allow(...Object.values(userRoles)),
    password: Joi.string()
        .regex(constants.PASSWORD_REGEXP)
        .required()
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum()
        .min(2)
        .max(30)
        .trim(),
    email: Joi.string().regex(constants.EMAIL_REGEXP),
    role: Joi.string().allow(...Object.values(userRoles)),
    password: Joi.forbidden()
});

module.exports = {
    creatUserValidator,
    updateUserValidator
};
