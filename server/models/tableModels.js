const Sequelize = require('sequelize');
const db = require('./../db');

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  lat: Sequelize.FLOAT,
  long: Sequelize.FLOAT
})


module.exports = {
  User: User
}