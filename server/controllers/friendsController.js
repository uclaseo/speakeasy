const Table = require('../models/tableModels');
const helper = require('./controllerHelper');

// const fetchPossibleFriends = (req, res) => {
//   Table.Cross_Path.findAll({ 
//     where: {
//       $or: [{ 
//         userId: req.params.userId 
//       }, {
//         possibleId: req.params.userId
//       }]
//     }
//   })
//     .then((friends) => {
//       res.send(friends);
//     })
//     .catch((err) => {
//       console.error('error fetching possible friends ', err);
//     })
// }

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

module.exports = { fetchPossibleFriends };