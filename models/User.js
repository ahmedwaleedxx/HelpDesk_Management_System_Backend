const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    userType: {
        type: 'String',
        enum: ['supportagent', 'customer'],
        required: true,
        //default: 'customer'
    },
    creationDate: {
        type: 'Date',
        default: Date.now
    },
    UpdatedDate: {
        type: 'Date',
        default: Date.now
    }
});

module.exports = model('User', UserSchema);