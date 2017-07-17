const Table = require('./../models/tableModels');

const fetchDMRoomsForUser = (req, res) => {
  Table.DM_Room.findAll({
    where: { userId: req.params.userId },
    include: [{ 
      model: Table.User,
      as: 'another'
    }]
  })
    .then((rooms) => {
      res.json({
        dm_rooms: rooms
      })
    })
    .catch((err) => {
      console.error('error fetching direct message rooms ', err);
    })
}

const createDMRoom = (req, res) => {
  Table.DM_Room.findOrCreate({
    where: {
      userId: req.body.anotherId,
      anotherId: req.body.userId
    }
  })
    .spread((response, isCreated) => {
      if (isCreated) {
        Table.DM_Room.create({
          userId: req.body.userId,
          anotherId: req.body.anotherId
        })
          .then((room) => {
            res.status(201).send(room);
          })
      } else {
        res.send({
          status: 'already exists'
        })
      }
    })
    .catch((err) => {
      console.error('error creating DM room ', err);
    })
}

const deleteDMRoom = (req, res) => {
  Table.DM_Room.destroy({ 
    where: { 
      userId: req.body.userId,
      anotherId: req.body.anotherId
    }})
    .then(() => {
      Table.DM_Room.destroy({
        where: {
          userId: req.body.anotherId,
          anotherId: req.body.userId
        }
      })
    })
    .then(() => {
      res.status(201).send('successfully deleted DM room');
    })
    .catch((err) => {
      console.error('error deleting DM room ', err);
    })
}

module.exports = {
  fetchDMRoomsForUser: fetchDMRoomsForUser,
  createDMRoom: createDMRoom,
  deleteDMRoom: deleteDMRoom
}