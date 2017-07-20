const db = require('./db');
const mongoConfig = require('./db/mongodb');
const Table = require('./models/tableModels');
const userDummy = require('./dummy');

//-------------CHANGE THIS TO *TRUE* ONLY WHEN YOU WANT TO REDO YOUR DB---------//
//                                                                             //
const firstTime = false;                                                      //
//                                                                           //
//--------------------------------------------------------------------------//

const init = () => {
  let syncObj = firstTime ? { force: true } : null;
  mongoConfig();

  return (
    db.authenticate()
      .then(() => Table.User.sync(syncObj))
      .then(() => Table.Event.sync(syncObj))
      .then(() => Table.Message.sync(syncObj))
      .then(() => Table.DM_Room.sync(syncObj))
      .then(() => Table.DM_Message.sync(syncObj))
      .then(() => Table.Image.sync(syncObj))
      .then(() => Table.User_Event.sync(syncObj))
      .then(() => Table.Cross_Path.sync(syncObj))
      // .then(() => Field.bulkCreate(userDummy))
      .then(() => console.log('successfully synced with database'))
      .catch(err => console.error('error syncing with database ', err))
  );
};

module.exports = init;
