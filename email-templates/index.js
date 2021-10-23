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
    }
};
