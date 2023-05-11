const { check } = require('express-validator');

module.exports.validateTicketData = () => {
    const validationMiddlewares = [
        check('title').notEmpty().withMessage('Title cannot be empty'),
        check('title').trim().escape(),
        check('description').notEmpty().withMessage('Description cannot be empty')
    ];
    return validationMiddlewares;
}

module.exports.validateCommentData = () => {
    const validationMiddlewares = [
        check('comment').notEmpty().withMessage('Comment cannot be empty'),
        check('comment').trim().escape()
    ];
    return validationMiddlewares;
}


module.exports.validateEditTicketData = () => {
    const validationMiddlewares = [
        check('title').notEmpty().withMessage('Title cannot be empty'),
        check('title').trim().escape(),
        check('description').notEmpty().withMessage('Description cannot be empty'),
        check('description').trim().escape()
    ];
    return validationMiddlewares;
}

module.exports.validateEditCommentData = () => {
    const validationMiddlewares = [
        check('comment').notEmpty().withMessage('Comment cannot be empty'),
        check('comment').trim().escape()
    ];
    return validationMiddlewares;
}
