const User = require("../models/User.js");
var jwt    = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.findAll({ where: { email: req.body.email, status: 'active' }, limit: 1 })
    .then(data => {
      if (data.length) {
        return res.status(422).send({
          message: "Email sudah digunakan"
        });
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8)
        })
          .then(data => {
            return res.status(404).send({
              message: 'Berhasil registrasi'
            });
          })
          .catch(err => {
            return res.status(500).send({
              message: err.message
            });
          });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || 'Error'
      });
    });
};

exports.signin = (req, res) => {
  User.findAll({ where: { email: req.body.email }, limit: 1 })
    .then(data => {
      if (data.length) {
        var data = data[0];
        if (data.status === 'inactive') {
          return res.status(422).send({
            message: 'User tidak aktif'
          });
        } else {
          var checkPassword = bcrypt.compareSync(
            req.body.password,
            data.password
          );

          if (!checkPassword) {
            return res.status(401).send({
              message: "Password salah"
            });
          } else {
            var token = jwt.sign({ id: data.id }, process.env.SECRET);

            return res.send({
              message: 'Berhasil masuk',
              data: {
                token: token
              }
            });
          }
        }
      } else {
        return res.status(404).send({
          message: 'Data tidak ditemukan'
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || 'Error'
      });
    });
};

exports.info = (req, res) => {
  console.log(req.userID)
  User.findByPk(req.userID)
    .then(data => {
      return res.send({
        message: 'Berhasil',
        data: data
      });
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || 'Error'
      });
    });
};
