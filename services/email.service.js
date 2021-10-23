const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const allTemplates = require('../email-templates');
const {ErrorHandler} = require('../errors');
const {errorMessages, errorStatus} = require('../configs');
const {NO_REPLY_EMAIL_USER, NO_REPLY_EMAIL_PASS} = require('../configs/config');

const templatesParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL_USER,
        pass: NO_REPLY_EMAIL_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(errorMessages.WRONG_TEMPLATE_NAME, errorStatus.STATUS_500);
    }

    const html = await templatesParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
