
const TicketModel = require('../models/ticket');
const NotificationsService = require('../services/notifications');
const AttachementModel = require('../models/attachment');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const CommentModel = require('../models/comment');

module.exports.createTicket = async (title,description,userId,email) => {
        const ticket = new TicketModel({
            title: title,
            body: description,
            Owner: userId
        });
        const ticketInfo = {
            ticketName: title,
            email: email
        }
        await NotificationsService.SlackAgents(ticketInfo);
        
        await ticket.save();
}

// TODO: Add validation to check if the user is the owner of the ticket
module.exports.getTickets = async (userId) => {
    try {
        const tickets = await TicketModel.find({
            Owner: {$eq: userId}
        }).select('-__v -Owner');

        return tickets;
    }catch(err){
        throw new Error("Error while getting tickets");
    }
}   

// TODO: Add validation to check if the user is the owner of the ticket

// The main concept of this function is to get ticket info by ID
module.exports.getTicket = async (userId,ticketId) => {
    try {
        const ticket = await TicketModel.findOne({
            _id: ticketId,
            Owner: {$eq: userId}
            });
        return ticket;
    }catch(err){
        throw new Error("Error while getting ticket");
    }
}

// TODO: Add validation to check if the user is the owner of the ticket
module.exports.AddComment = async (req,comment,userId,ticketId,type) => {
        const userType = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userType;
        let createdComment;
        if(userType === 'customer'){
            createdComment = new CommentModel({
                comment: comment,
                Owner: userId,
                Ticket: ticketId
            });
        }else{
            createdComment = new CommentModel({
                comment: comment,
                Owner: userId,
                Ticket: ticketId,
                Type: type
            });
        }
        await createdComment.save();
}

// DONE: instead of building a middleware to check if the user is the owner of the ticket, we can use the mongoose built in function ($eq) to check if the user is the owner of the ticket
module.exports.getComments = async (req,ticketId) => {
        const userRole = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userType;
        let comments;
        if(userRole === 'supportagent'){
            comments = await CommentModel.find({
                Ticket: ticketId
            }).select('-__v -Ticket');
        }else{
            comments = await CommentModel.find({
                Ticket: ticketId,
                Type: 'external'
            }).select('-__v -Ticket -Type').populate('Owner', 'name');
        }
        return comments;
}

// TODO: Add validation to check if the user is the owner of the ticket
module.exports.deleteComment = async (userId,commentId) => {
        const comment = await CommentModel.findOne({
            _id: commentId,
            userId: {$eq: userId}
        });
        if(comment){
            await comment.delete();
        }else{
            throw new Error("Comment not found");
        }
}

// TODO: Add validation to check if the user is the owner of the ticket
module.exports.updateComment = async (userId,commentId, message) => {
    try{
        const comment = await CommentModel.findOne({
            _id: commentId,
            Owner: {$eq: userId}
        });
        comment.comment = message;
        await comment.save();
    }catch(err){
        throw new Error("Error while updating comment");
    }
}

module.exports.addAttachment = async (ticketId, filename,filePath,userId) => {
    const attachment = new AttachementModel({
        name: filename,
        url: filePath,
        Owner: userId,
        Ticket: ticketId
    });
    await attachment.save();
}

module.exports.findAttachments = async (userId,userType,ticketId) => {
    try{
    let attachments;
    if(userType === 'customer'){
        attachments = await AttachementModel.find({
            Ticket: ticketId,
            Owner: {$eq: userId}
        }).select('-__v -Ticket -_id').populate('Owner','-__v -_id -password -email -userType -creationDate -UpdatedDate');;
    }else{
        attachments = await AttachementModel.find({
            Ticket: ticketId
        }).select('-__v -Ticket').populate('Owner','-__v -_id -password -email -userType -creationDate -UpdatedDate');
    }
    return attachments;
} catch(err){
    throw new Error("Error while getting attachments");
}

}

module.exports.deleteAttachment = async (userId,attachmentId) => {
        const attachment = await AttachementModel.findById({
            _id: attachmentId,
            Owner: {$eq: userId}
        });
        if(attachment){
            fs.unlinkSync(attachment.url);
            await attachment.delete();
        }else{
            throw new Error("Attachment not found");
        }
}
