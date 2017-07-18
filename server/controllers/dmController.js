const Table = require('./../models/tableModels');

const fetchDMRoomsForUser = (req, res) => {
  let allRooms = [];
  Table.User.findAll({
    where: { id: req.params.userId },
    include: [{ 
      model: Table.User,
      as: 'another'
    }]
  })
    .then((rooms) => {
      allRooms.push(rooms)
    })
    .then(() => {
      Table.User.findAll({
        include: [{
          model: Table.User,
          where: { id: req.params.userId },
          as: 'another'
        }]
      })
      .then((rooms) => {
        allRooms.push(rooms);
        res.status(201).send(allRooms);
      })
    })
    .catch((err) => {
      console.error('error fetching direct message rooms ', err);
    })
}

const createDMRoom = (req, res) => {
  Table.DM_Room.findOne({ where: {
    $or: [{
      userId: req.body.userId,
      anotherId: req.body.anotherId
    },{
      userId: req.body.anotherId,
      anotherId: req.body.userId
    }]
  }})
    .then((response) => {
      if (response === null) {
        Table.DM_Room.create({
          userId: req.body.userId,
          anotherId: req.body.anotherId
        })
          .then((room) => {
            res.send({ room: room })
          })
      } else {
        res.json({ room: response })
      }
    })
    .catch(err => {
      console.error('error creating a new dm room ', err);
    })
}

const deleteDMRoom = (req, res) => {
  Table.DM_Room.destroy({ 
    where: {
      $or: [{
        userId: req.body.userId,
        anotherId: req.body.anotherId
      },{
        userId: req.body.anotherId,
        anotherId: req.body.userId
      }] 
    }})
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