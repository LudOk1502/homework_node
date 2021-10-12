const Joi = require('joi');

const {PASSWORD_REGEXP, EMAIL_REGEXP} = require('../configs/constants');
const userRoles = require('../configs/user-roles.enum');

const creatUserValidator = Joi.object({
    name: Joi.string().alphanum()
        .min(2)
        .max(30)
        .trim()
        .required()
        .uppercase(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required(),
    role: Joi.string()
        .allow(...Object.values(userRoles)),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required()
        .strict()
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum()
        .min(2)
        .max(30)
        .trim()
        .uppercase(),
    email: Joi.string().regex(EMAIL_REGEXP),
    role: Joi.string().allow(...Object.values(userRoles)),
    password: Joi.forbidden()
});

module.exports = {
    creatUserValidator,
    updateUserValidator
};
