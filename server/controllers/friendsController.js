const Table = require('../models/tableModels');
const helper = require('./controllerHelper');

const fetchPossibleFriends = (req, res) => {
  let allFriends = [];
  Table.User.findAll({
    where: { id: req.params.userId },
    include: [{ 
      model: Table.User,
      as: 'possible'
    }]
  })
    .then((friends) => {
      allFriends.push(friends)
    })
    .then(() => {
      Table.User.findAll({
        include: [{
          model: Table.User,
          where: { id: req.params.userId },
          as: 'possible'
        }]
      })
      .then((friends) => {
        allFriends.push(friends);
        let friendsList = helper.parseFriendsList(allFriends);
        console.log('this is the friends list: ', friendsList);
        res.status(201).send(friendsList);
      })
    })
    .catch((err) => {
      console.error('error fetching possible friends ', err);
    })
}

const updateChatting = (req, res) => {
  Table.Cross_Path.update({ chatting: true }, {
    where: { id: req.body.cpId }
  })
    .then((response) => {
      res.send('now chatting = true');
    })
    .catch((err) => {
      console.error('error updating friend chat ', err);
    })
}

module.exports = { 
  fetchPossibleFriends: fetchPossibleFriends,
  updateChatting: updateChatting
};