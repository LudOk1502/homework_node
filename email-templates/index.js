const emailActionsEnum = require('../configs/email-action.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    },

    [emailActionsEnum.LOGIN]: {
        templateName: 'login',
        subject: 'You login!'
    },

    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'You are update!'
    },

    [emailActionsEnum.DELETE]: {
        templateName: 'delete',
        subject: 'You are delete!'
    },

    [emailActionsEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot_password',
        subject: 'Dont worry!'
    },
    [emailActionsEnum.NEW_PASSWORD_AFTER_FORGOT]: {
        templateName: 'new_password_after_forgot',
        subject: 'Password update!'
    }
};
