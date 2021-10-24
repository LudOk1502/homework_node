const {Schema, model} = require('mongoose');

const {actionTokenTypeEnum} = require('../configs');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    token_type: {
        type: String,
        required: true,
        enum: Object.values(actionTokenTypeEnum),
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

actionTokenSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model('action_token', actionTokenSchema);
