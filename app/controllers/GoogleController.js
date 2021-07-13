require('dotenv').config();
const User = require("../models/User.js");
var jwt    = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const googleConfig  = require("../config/google.config.js");
const NodeGoogleLogin = require('node-google-login');

exports.signin = (req, res) => {
  const googleLogin = new NodeGoogleLogin(googleConfig);
  const authURL = googleLogin.generateAuthUrl()
  
  return res.send({
    message: 'Berhasil',
    data: authURL
  });
};

exports.callback = (req, res) => {
  const googleLogin = new NodeGoogleLogin(googleConfig);

  googleLogin.getUserProfile(req.query.code).then(user => {
    let email = user.user.email
    User.findAll({ where: { email: email, status: 'active' }, limit: 1 })
    .then(data => {
      if (data.length) {
        var token = jwt.sign({ id: data[0].id }, process.env.SECRET);
        return res.send({
          message: 'Berhasil masuk',
          data: {
            token: token
          }
        });
      } else {
        User.create({
          name: user.user.given_name,
          email: email,
          password: bcrypt.hashSync(process.env.PASSWORD_DEFAULT, 8)
        }).then(userCreate =>{
          var token = jwt.sign({ id: userCreate.id }, process.env.SECRET);

          return res.send({
            message: 'Berhasil masuk',
            data: {
              token: token
            }
          });
        }).catch(err => {
          return res.status(500).send({
            message: err.message || 'Error'
          });
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || 'Error'
      });
    });
  }).catch(error => {
    return res.status(500).send({
      message: error.message || 'Error'
    });
  })
  
  
};
