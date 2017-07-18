const Sequelize = require('sequelize');
const db = require('./../db');


const User = db.define('user', {
  name: Sequelize.STRING,
  handle: Sequelize.STRING,
  email: Sequelize.STRING,
  photo: Sequelize.TEXT,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT
});



const Event = db.define('event', {
  eventName: Sequelize.STRING,
  password: Sequelize.STRING,  // integer for simplicity or string?
  latitude: Sequelize.FLOAT,  // Sequelize has GEOMETRY type, I'll look into it
  longitude: Sequelize.FLOAT,  // Sequelize has GEOMETRY type, I'll look into it
  isLive: Sequelize.BOOLEAN
});


// const SuggestedFriends = db.define('suggestedFriends',{

// })

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
  imageLink: Sequelize.TEXT,
});

const User_Event = db.define('user_event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

User.hasMany(Event);
Event.belongsTo(User);


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
  through: DM_Room
});
DM_Room.belongsTo(User, {
  as: 'another'
})

User.hasMany(User_Event)
User_Event.belongsTo(User)
Event.hasMany(User_Event)
User_Event.belongsTo(Event)
// User.belongsToMany(Event, {
//   through: User_Event,
// });
// Event.belongsToMany(User, {
//   through: User_Event,
// });


// DM_Message.belongsTo(DM_Room);
// DM_Room.hasMany(DM_Message);


module.exports = {
  User: User,
  Event: Event,
  Message: Message,
  DM_Room: DM_Room,
  DM_Message: DM_Message,
  Image: Image,
  User_Event: User_Event
}