
const { Schema, model } = require('mongoose');

const AttachmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = model('Attachment', AttachmentSchema);