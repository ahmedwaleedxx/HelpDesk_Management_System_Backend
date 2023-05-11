const { check } = require('express-validator');

module.exports.validateArticleData = () => {
    const validationMiddlewares = [
        check('title').notEmpty().withMessage('Title cannot be empty'),
        check('title').trim().escape(),
        check('content').notEmpty().withMessage('Content cannot be empty'),
        check('content').trim().escape()
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

module.exports.validateEditArticleData = () => {
    const validationMiddlewares = [
        check('title').notEmpty().withMessage('Title cannot be empty'),
        check('title').trim().escape(),
        check('content').notEmpty().withMessage('Content cannot be empty'),
        check('content').trim().escape()
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


