const Sequelize = require('sequelize');
const db = require('./../db');

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  lat: Sequelize.FLOAT,
  long: Sequelize.FLOAT
});

const Event = db.define('event', {
  eventName: Sequelize.STRING,
  password: Sequelize.STRING,  // integer for simplicity or string?
  latitude: Sequelize.INTEGER,  // Sequelize has GEOMETRY type, I'll look into it
  longitude: Sequelize.INTEGER  // Sequelize has GEOMETRY type, I'll look into it
});

const Message = db.define('message', {
  text: Sequelize.TEXT
});

const DM_Room = db.define('dm_room', {
});

const DM_Message = db.define('dm_message', {
  text: Sequelize.TEXT
});

const Image = db.define('image', {
  name: Sequelize.STRING,
  imageLink: Sequelize.STRING
});


module.exports = {
  User: User
}