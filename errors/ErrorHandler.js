// eslint-disable-next-line require-jsdoc
class ErrorHandler extends Error {
    // eslint-disable-next-line require-jsdoc
    constructor(messege, status) {
        super(message);
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = {ErrorHandler};
