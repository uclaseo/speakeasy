const db = require('./db');
const Table = require('./models/tableModels');

const init = () => {
  return db.authenticate()
    .then(() => Table.User.sync({force: true}))
    .then(() => Table.Event.sync({force: true}))
    .then(() => Table.Message.sync({force: true}))
    .then(() => Table.DM_Room.sync({force: true}))
    .then(() => Table.DM_Message.sync({force: true}))
    .then(() => Table.Image.sync({force: true}))
    .then(() => Table.User_Event.sync({force: true}))
    .then(() => console.log('successfully synced with database'))
    .catch(err => console.error('error syncing with database ', err))
};

module.exports = init;
