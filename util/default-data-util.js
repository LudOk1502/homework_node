const {User} = require('../dataBase');
const {config, userRoles} = require('../configs');

module.exports = async () => {
    const user = await User.findOne({role: userRoles.ADMIN});

    if (!user) {
        await User.createUserWithPassword({
            name: 'Ira',
            email: 'iryna123@gmai.com',
            password: config.DEFAULT_PASSWORD,
            role: userRoles.ADMIN
        });
    }
};
