

const db = require('./db');
const mongoConfig = require('./db/mongodb');
const Table = require('./models/tableModels');
const Dummy = require('./dummy');

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
      // populate with dummy data ONCE, then comment them out
      // .then(() => Table.User.bulkCreate(Dummy.userDummy)) 
      // .then(() => Table.Event.bulkCreate(Dummy.eventDummy))
      // .then(() => Table.Cross_Path.bulkCreate(Dummy.crossPathDummy))
      // .then(() => Table.User_Event.bulkCreate(Dummy.userEventDummy))

      .then(() => console.log('successfully synced with database'))
      .catch(err => console.error('error syncing with database ', err))
  );
};

module.exports = init;
