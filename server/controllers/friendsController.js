const Table = require('../models/tableModels');

const fetchPossibleFriends = (req, res) => {
  Table.Cross_Path.findAll({ where: {
    
    $or: [{ 
      userId: req.params.userId 
    }, {
      possibleId: req.params.userId
    }]
  }})
    .then((friends) => {
      res.send(friends);
    })
    .catch((err) => {
      console.error('error fetching possible friends ', err);
    })
}

module.exports = { fetchPossibleFriends };