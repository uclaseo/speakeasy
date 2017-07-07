const db = require('./db');
const Table = require('./models/tableModels');

const init = () => {
  return db.authenticate()
    .then(() => Table.sync())
    .then(() => console.log('successfully synced with database'))
    .catch(err => console.error('error syncing with database ', err))
};

module.exports = init;