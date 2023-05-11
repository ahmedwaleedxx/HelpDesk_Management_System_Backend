
const jwt = require('jsonwebtoken');

const userModel = require('../models/User');

const isAuthenticated = async (req, res, next) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.userId);
            if(user){
                req.user = user;
                next();
            }else{
                res.status(401).send({
                    error: "Invalid token"
                });
            }
        } catch(err){
            res.status(401).send({
                error: err.message
            });
        }
    }else{
    res.status(401).send({
        error: "You should be logged in to access this resource"
    });
}
};

module.exports = isAuthenticated;