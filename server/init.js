const db = require('./db');
const Table = require('./models/tableModels');

const init = () => {
  return db.authenticate()
    .then(() => Table.User.sync())
    .then(() => Table.Event.sync())
    .then(() => Table.Message.sync())
    .then(() => Table.DM_Room.sync())
    .then(() => Table.DM_Message.sync())
    .then(() => Table.Image.sync())
    .then(() => Table.User_Event.sync())
    .then(() => console.log('successfully synced with database'))
    .catch(err => console.error('error syncing with database ', err))
};

module.exports = init;
