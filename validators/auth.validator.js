const Joi = require('joi');

const {PASSWORD_REGEXP, EMAIL_REGEXP} = require('../configs/constants');

const authUserValidator = Joi.object({
    email: Joi.string()
        .required()
        .regex(EMAIL_REGEXP)
        .trim(),
    password: Joi.string()
        .required()
        .regex(PASSWORD_REGEXP)

});

module.exports = {authUserValidator};
