const Table = require('./../models/tableModels');
const fetchUsersForEvent = require('./controllerHelper');
const Sequelize = require('sequelize');

const crossPathUpdate = (req, res) => {
  let users = [];
  Table.User_Event.findAll({
    where: { eventId: req.params.eventId },
    attributes: ['userId']
  })
    .then((userList) => {
      for (var i = 0; i < userList.length; i++) {
        users.push(userList[i].dataValues.userId)
      }
      console.log(users);
      res.send({ message: 'you did something crazy'})
      postCrossPath(users);
    })
} 

const postCrossPath = (arr) => {
  let pairs = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  pairs.forEach((pair) => {
    Table.Cross_Path.findOne({
      where: {
        $or: [{
          userId: pair[0],
          possibleId: pair[1]
        }, {
          userId: pair[1],
          possibleId: pair[0]
        }]
      }
    })
      .then((found) => {
        if(!found) {
          Table.Cross_Path.create({
            userId: pair[0],
            possibleId: pair[1],
            count: 1
          })
        } else {
          Table.Cross_Path.update({
            count: Sequelize.literal('count + 1')
          }, {
            where: { id: found.id }
          })
        }
      })
      .catch((err) => {
        console.error('error posting shit ', err);
      })
  })
}
module.exports = { crossPathUpdate: crossPathUpdate }
