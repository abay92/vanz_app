const jwt = require('jsonwebtoken');
const User = require("../models/User.js");

verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            message: 'Tidak ada token'
        });
    }

    let jwttoken = token.split(' ');

    jwt.verify(jwttoken[1], process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Token salah'
            });
        }

        User.findByPk(decoded.id)
            .then(data => {
                if (data.status === 'inactive') {
                    return res.status(401).send({
                        message: 'Token salah'
                    });
                }
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || 'Error'
                });
            });
            
        req.userID = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;
