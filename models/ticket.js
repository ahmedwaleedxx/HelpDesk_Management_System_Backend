const { Schema, model } = require('mongoose');

const TicketSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    body: {
        type: 'String',
        required: true
    },
    status: {
        type: 'String',
        enum: ['open', 'closed'],
        required: true,
        default: 'open'
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
    Priority: {
        type: 'String',
        enum: ['low', 'medium', 'high'],
        required: true,
        default: 'low'
    },
    Assignedto: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

module.exports = model('Ticket', TicketSchema);
