module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/homework_lesson3',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 500,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 500,

    NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS,
    NO_REPLY_EMAIL_USER: process.env.NO_REPLY_EMAIL_USER
};
