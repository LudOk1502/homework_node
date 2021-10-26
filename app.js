const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const {authRouter, userRouter} = require('./routes');
const {errorStatus, config} = require('./configs');
const startCron = require('./cron');
const {ErrorHandler} = require('./errors/ErrorHandler');
const {defaultDataUtil} = require('./util');

mongoose.connect(config.MONGO_CONNECT_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

if (config.NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (err, req, res) => {
    res
        .status(err.status || errorStatus.STATUS_500)
        .json({
            message: err.message
        });
});

app.listen(config.PORT, () => {
    console.log(`App listen ${config.PORT}`);
    defaultDataUtil();
    startCron();
});

// eslint-disable-next-line require-jsdoc
function _configureCors(origin, callback) {
    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
};
