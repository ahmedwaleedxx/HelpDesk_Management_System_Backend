const NotificationsModel = require('../models/notifications');
const axios = require('axios');

module.exports.SlackAgents = async (ticketInfo) => {
    try {
        const slack = await axios.post(process.env.SLACK_WEBHOOK_URL, {
            text: `Ticket ${ticketInfo.ticketName} has been created by ${ticketInfo.email}`
        });
        if(slack === "ok"){
            return true;
        }else{
            return false;
        }
    } catch (err) {
        throw new Error('Could not send slack message.');
    }
};

module.exports.addToNotifications = async (notificationsInfo) => {
    try {
        const notification = new NotificationsModel({
            NotificationType: notificationsInfo.NotificationType,
            NotificationDetails: notificationsInfo.NotificationDetails,
            NotificationTime: notificationsInfo.NotificationTime,
            Owner: notificationsInfo.Owner
        });
        const notify = await notification.save();
        return notify;
    } catch (err) {
        throw new Error('Could not notify.');
    }
};

module.exports.findAllNotifications = async (userId) => {
    try {
        const notifications = await NotificationsModel.find({
            Owner: userId
        });
        return notifications;
    } catch (err) {
        throw new Error('Could not view notifications');
    }
};

module.exports.removeNotifications = async (notificationId) => {
    const notification = await NotificationsModel.findOne({
        _id: notificationId
    });
    if(notification){
        await notification.delete();
    }else{
        throw new Error("Notification not found");
    }
  };
