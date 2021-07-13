const Sequelize = require('sequelize');
const db        = require('./index.js');
const DataTypes = Sequelize;
 
// Define schema
const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
});
 
module.exports = User;
  