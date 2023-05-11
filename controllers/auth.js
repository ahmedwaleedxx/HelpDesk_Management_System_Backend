const AuthenticationService = require('../services/auth');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

module.exports.postUser = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        const { name, email, password } = req.body;
        const doesCustomerExist = await AuthenticationService.doesCustomerExist(email);
        if(doesCustomerExist){
            res.status(400).json({
                error: "User already exists"});
        }else{
            await AuthenticationService.registerCustomer({name, email, password});
            res.status(201).json({
                message: "User created successfully, please check your email for verification"});
        }
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }     
};

module.exports.editUser = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        const { name, email } = req.body;
        const doesCustomerExist = await AuthenticationService.doesCustomerExist(email); 
        if(doesCustomerExist){
            res.status(400).json({
                message: "Email already exists"});
        }else{
            await AuthenticationService.editCustomerInfo({userId, name, email});
            res.status(201).json({
                message: "User edited successfully"});
        }
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
};

module.exports.updatePassword = async (req, res) => {
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
    try {
        const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        const {password } = req.body;
        await AuthenticationService.updatePassword({userId, password});
        res.status(201).json({
            message: "Password updated successfully"});
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
    }
};

module.exports.login = async (req, res) => {
    
    const errors = validationResult(req).array();
    if(errors.length > 0){
        return res.status(422).send({
            error: errors[0].msg
        });
    }else{
        try {
            const { email, password } = req.body;
            const user = await AuthenticationService.checkCredentials(email, password);
            if(user){
                const token = await AuthenticationService.generateJWT(user);
                res.status(200).json({
                    message: "Login successful",
                    jwt: token,
                    userId: user._id,
                    userType: user.userType
                });
            }else{
                res.status(401).json({
                    message: "Invalid credentials"
                });
            }
        } catch(err){
            res.status(500).send({
                error: err.message
        });
    }
    }
};

module.exports.getUser = async (req,res) => {
    try{
    const token = req.headers.authorization.split(' ')[1];
    const user = await AuthenticationService.getUserInfo(token);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(401).json({
            message: "Invalid token"
        });
    }
    }catch(err){
        res.status(500).send({
            error: err.message
    });
    }
};