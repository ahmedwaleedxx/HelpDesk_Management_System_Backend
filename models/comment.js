const { Schema, model } = require('mongoose');


const CommentSchema = new Schema({
    comment: {
        type: 'String', 
        required: true
    },
    creationDate: {
        type: 'Date',
        default: Date.now
    },
    UpdatedDate: {
        type: 'Date',
        default: Date.now
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    Type:{
        type: 'String',
        enum: ['internal', 'external'],
        required: true,
        default: 'external'
    }
});

module.exports = model('Comment', CommentSchema);