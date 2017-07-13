const db = require('./db');
const mongoConfig = require('./db/mongodb');
const Table = require('./models/tableModels');
const userDummy = require('./dummy');

const init = () => {
  mongoConfig();
  
  return db.authenticate()
    .then(() => Table.User.sync())
    .then(() => Table.Event.sync())
    .then(() => Table.Message.sync())
    .then(() => Table.DM_Room.sync())
    .then(() => Table.DM_Message.sync())
    .then(() => Table.Image.sync())
    .then(() => Table.User_Event.sync())
    // .then(() => Field.bulkCreate(userDummy))
    .then(() => console.log('successfully synced with database'))
    .catch(err => console.error('error syncing with database ', err))
};

// const init = () => {
//   mongoConfig();

//   return db.authenticate()
//     .then(() => Table.User.sync({force: true}))
//     .then(() => Table.Event.sync({force: true}))
//     .then(() => Table.Message.sync({force: true}))
//     .then(() => Table.DM_Room.sync({force: true}))
//     .then(() => Table.DM_Message.sync({force: true}))
//     .then(() => Table.Image.sync({force: true}))
//     .then(() => Table.User_Event.sync({force: true}))
//     .then(() => Field.bulkCreate(userDummy))
//     .then(() => console.log('successfully synced with database'))
//     .catch(err => console.error('error syncing with database ', err))
// };

module.exports = init;
