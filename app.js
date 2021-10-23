const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {authRouter, userRouter} = require('./routes');
const {errorStatus, config} = require('./configs');

mongoose.connect(config.MONGO_CONNECT_URL);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
});
