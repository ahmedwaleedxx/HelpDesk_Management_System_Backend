const { check } = require('express-validator');

module.exports.validateCustomerData = () => {
    const validationMiddlewares = [
        check('name').notEmpty().withMessage('Name cannot be empty'),
        check('name').trim().escape(),
        check('email').isEmail().withMessage('Email is not valid'),
        check('password').notEmpty().withMessage('Password cannot be empty'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ];
    return validationMiddlewares;
} 

module.exports.validateEditCustomerData = () => {
    const validationMiddlewares = [
        check('name').notEmpty().withMessage('Name cannot be empty'),
        check('name').trim().escape(),
        check('email').isEmail().withMessage('Email is not valid'),
    ];
    return validationMiddlewares;
}

module.exports.validatePasswordData = () => {
    const validationMiddlewares = [
        check('password').notEmpty().withMessage('Password cannot be empty'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ];
    return validationMiddlewares;
}

module.exports.validateLoginData = () => {
 
    const validationMiddlewares = [
        check('email').isEmail().withMessage('Email is not valid'),
        check('password').notEmpty().withMessage('Password cannot be empty'),
    ];
    return validationMiddlewares;
}