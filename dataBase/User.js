const {Schema, model} = require('mongoose');

const {passwordService} = require('../services');
const {userRoles} = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    }
};

userSchema.virtual('fullname').get(function() {
    return `${this.name} - ${this.role}`;
});

userSchema.statics = {
    testStatic() {
        console.log('TEST STATIC');
    },
    // eslint-disable-next-line require-await
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    }
};

module.exports = model('user', userSchema);
