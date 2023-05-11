const NotificationsService = require('../services/notifications');
const jwt = require('jsonwebtoken');

module.exports.getNotification = async(req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    try {
        const notifications = await NotificationsService.findAllNotifications(userId);
        res.send({ notifications });
    } catch (err) {
        res.status(500); //server error
        res.send({
            error: err
        });
    }
};

//Route handler function that gets the notification info from the req. body
//and pass it to the service method
module.exports.postNotification = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    const notificationsInfo = {
        NotificationType: req.body.NotificationType,
        NotificationDetails: req.body.NotificationDetails,
        NotificationTime: req.body.NotificationTime,
        Owner: userId
    };
    try {
        const notify = await NotificationsService.addToNotifications(notificationsInfo);
        return res.status(201).send({
            message: 'Notifications added successfully.',
            notificationID: notify._id
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
};

module.exports.removeNotification = async (req, res) => {
    const notificationID = req.params.notificationID;
    try {
      await NotificationsService.removeNotifications(notificationID);
      return res.send({
        msg: 'Notification deleted successfully.'
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message
      });
    }
  };
