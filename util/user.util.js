module.exports = {
    userNormalizator: (userToNormalize = {}) => {
        const fieldsToRemove = [
            'password',
            '--v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};