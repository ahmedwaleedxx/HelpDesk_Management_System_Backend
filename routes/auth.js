const { Router } = require('express');

const authenticationController = require('../controllers/auth');
const CustomerValidator = require('../validators/customer');
const authenitcationRouter = Router();

authenitcationRouter.post('/register', 
CustomerValidator.validateCustomerData(),
authenticationController.postUser);


authenitcationRouter.post('/login',
CustomerValidator.validateLoginData(),
authenticationController.login);

module.exports = authenitcationRouter;