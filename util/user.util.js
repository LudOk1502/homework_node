module.exports = {
    userNormalizator: (userToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach((field) => {
            userToNormalize[field] = undefined;
        });

        return userToNormalize;
    }
};
