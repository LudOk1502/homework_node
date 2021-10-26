const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove');

module.exports = () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Cron start at', new Date().toISOString());
        await removeOldTokens();
        console.log('Cron finished at', new Date().toISOString());
    });
};
