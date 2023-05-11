const TicketController = require('../controllers/ticket');

const ticketValidator = require('../validators/ticket');

const uploads = require('../middleware/upload');

const {Router} = require('express');

const ticketRouter = Router();

// Authorization middleware to check if user is logged in before processing request
const isAuthenticated = require('../middleware/auth');

ticketRouter.post('/create',isAuthenticated,
ticketValidator.validateTicketData(),
TicketController.postTicket);

ticketRouter.get('/getUserTickets',isAuthenticated,
TicketController.getTickets);

ticketRouter.get('/retrive/:ticketId',isAuthenticated,
TicketController.getTicket);

ticketRouter.post('/:ticketId/comment',isAuthenticated,
ticketValidator.validateCommentData(),
TicketController.postComment);

ticketRouter.get('/comments/:ticketId',isAuthenticated,
TicketController.getComments);

ticketRouter.put('/comment/:commentId',isAuthenticated,
TicketController.updateComment);

ticketRouter.delete('/comment/:commentId',isAuthenticated,
TicketController.deleteComment);

ticketRouter.post('/:ticketId/attachment',isAuthenticated, 
uploads,
TicketController.postAttachment);

ticketRouter.get('/:ticketId/attachments',isAuthenticated,
TicketController.getAttachments);

ticketRouter.delete('/attachment/:attachmentId',isAuthenticated,
TicketController.deleteAttachment);
module.exports = ticketRouter;