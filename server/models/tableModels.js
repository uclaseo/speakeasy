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
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

const DM_Message = db.define('dm_message', {
  text: Sequelize.TEXT
});

const Image = db.define('image', {
  name: Sequelize.STRING,
  imageLink: Sequelize.STRING
});

const User_Event = db.define('user_event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

// Event.belongsTo(Message, {
//   foreignKey: 'chat'
// });
// Message.hasOne(Event, {
//   foreignKey: 'chat'
// });

User.belongsToMany(Event, {
  foreignKey: 'userId',
  through: 'user_event'
});
Event.belongsToMany(User, {
  foreignKey: 'eventId',
  through: 'user_event'
});

Image.belongsTo(User);
User.hasMany(Image);

Image.belongsTo(Event);
Event.hasMany(Image);

Message.belongsTo(Event);
Event.hasMany(Message);

Message.belongsTo(User);
User.hasMany(Message);

User.belongsToMany(User, {
  as: 'another',
  through: 'dm_room'
});
DM_Room.belongsTo(User, {
  as: 'another'
})

DM_Message.belongsTo(DM_Room);
DM_Room.hasMany(DM_Message);


module.exports = {
  User: User,
  Event: Event,
  Message: Message,
  DM_Room: DM_Room,
  DM_Message: DM_Message,
  Image: Image,
  User_Event: User_Event
}