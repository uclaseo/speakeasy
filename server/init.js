const crossPathDummy = [
  {id: 1, count: 3, userId: 1, possibleId: 2, chatting: false},
  {id: 2, count: 2, userId: 3, possibleId: 1, chatting: false},
  {id: 3, count: 1, userId: 1, possibleId: 4, chatting: true},
  {id: 4, count: 5, userId: 5, possibleId: 1, chatting: false},
  {id: 5, count: 4, userId: 1, possibleId: 8, chatting: false},
  {id: 6, count: 4, userId: 9, possibleId: 1, chatting: false},
]

const db = require('./db');
const mongoConfig = require('./db/mongodb');
const Table = require('./models/tableModels');
const userDummy = require('./dummy');

//-------------CHANGE THIS TO *TRUE* ONLY WHEN YOU WANT TO REDO YOUR DB---------//
//                                                                             //
const firstTime = true;                                                      //
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
