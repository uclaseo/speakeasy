const mongoose = require('mongoose');

const mongoConfig = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/speakeasy');
  mongoose.connection
    .once('open', () => console.log('mongoose is running'))
    .on('error', err => console.error('error running mongoose ', err))
};

module.exports = mongoConfig;