const { Schema, model } = require('mongoose');

const NotificationSchema = new Schema({
    NotificationType: {
        type: 'String',
        required: true
    },
    NotificationDetails: {
        type: 'String',
        required: true
    },
    NotificationTime: {
        type: 'String',
        required: true
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const NotificationsModel = model('notifications', NotificationSchema);

module.exports = NotificationsModel;
