const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const isSupportAgent = async (req, res, next) => {

    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await userModel.findById(decoded.userId);
                if(user){
                    if(user.userType === "supportagent"){
                        req.user = user;
                        next();
                    }else{
                        res.status(401).send({
                            error: "You are not authorized to access this resource"
                        });
                    }
                }else{
                    res.status(401).send({
                        error: "Invalid token"
                    });
                }
        }else{
        res.status(401).send({
            error: "You should be logged in to access this resource"
        });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = isSupportAgent;