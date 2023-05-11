const TicketService = require('../services/ticket');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
module.exports.postTicket = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        const email = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).email;
        const { title, description } = req.body;
        await TicketService.createTicket(title, description,userId,email);
        res.status(201).json({
            message: "Ticket created successfully"});
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
};

module.exports.getTickets = async (req, res) => {
    try {
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        const tickets = await TicketService.getTickets(userId);
        res.status(200).json({
            tickets: tickets
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.getTicket = async (req, res) => {
    try {
        // TODO Authorize user to see if he is the owner of the ticket
        const ticketId = req.params.ticketId;
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        const ticket = await TicketService.getTicket(userId,ticketId);
        res.status(200).json({
            ticket: ticket
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.postComment = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        // TODO: replace userID with the actutal userID from JWT token
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        const ticketId = req.params.ticketId;
        const {comment} = req.body;
        await TicketService.AddComment(req,comment,userId,ticketId);
        res.status(201).json({
            message: "Comment added successfully"});
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
}

module.exports.getComments = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const comments = await TicketService.getComments(req,ticketId);
        res.status(200).json({
            comments: comments
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        await TicketService.deleteComment(userId,commentId);
        res.status(200).json({
            message: "Comment deleted successfully"
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.updateComment = async (req,res) => {

    try{
        const commentId = req.params.commentId;
        const { newMessage }  = req.body;
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        await TicketService.updateComment(userId,commentId,newMessage);
        res.status(200).json({
            message: "Comment updated Succesfully"
        });

    }catch(error){
        res.status(500).send({
            error: error.message
        });
    }
}

module.exports.postAttachment = async (req, res) => {
    try{
        if(req.fileValidationError){
            throw new Error(req.fileValidationError);
        }
        const filenPath = req.file.path;
        const fileName = req.file.filename;
        const ticketId = req.params.ticketId;
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
            
            await TicketService.addAttachment(ticketId, fileName,filenPath,userId);
            res.status(201).json({
                message: "Attachment added successfully"
            });
    }catch(error){
        res.status(500).send({
            error: error.message
        });
    }
}

module.exports.getAttachments = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        const userType = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userType;
        const attachments = await TicketService.findAttachments(userId,userType,ticketId);
        res.status(200).json(attachments);
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}

module.exports.deleteAttachment = async (req, res) => {
    try {
        const attachmentId = req.params.attachmentId;
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        await TicketService.deleteAttachment(userId,attachmentId);
        res.status(200).json({
            message: "Attachment deleted successfully"
        });
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
}