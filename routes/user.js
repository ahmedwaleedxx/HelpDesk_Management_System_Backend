const { Router } = require('express');

const isAuthenticated = require('../middleware/auth');
const authenticationController = require('../controllers/auth');
const CustomerValidator = require('../validators/customer');
const userRouter = Router();

userRouter.use(isAuthenticated);

userRouter.post('/edit',isAuthenticated,
CustomerValidator.validateEditCustomerData(),
authenticationController.editUser);

userRouter.post('/update-password',isAuthenticated,
CustomerValidator.validatePasswordData(),
authenticationController.updatePassword);

userRouter.get('/getUser',isAuthenticated,
authenticationController.getUser);

module.exports = userRouter;