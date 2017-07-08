const Table = require('../models/tableModels');

const signupUser = (req, res) => {
  Table.User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email,
      latitude: '100.00101010',
      longitude: '100.1010100101'
    }
  })
  .then((response) => {
    res.status(201).send(response);
  })
  .catch((error) => {
    res.send(error);
  });
};

const fetchUsers = (req, res) => {
  Table.User.findAll()
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.send(error);
  });
};

const createEvent = (req, res) => {
  let eventName = req.body.eventName;
  Table.Event.create({
    eventName: eventName,
    userId: req.params.userId
  })
  .then((response) => {
    res.status(201).send(response);
  })
  .catch((error) => {
    res.send(error);
  })
}

const fetchUserEvents = (req, res) => {
  Table.User_Event.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: Table.Event
      }
    ]
  })
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.send(error);
  })
}

const joinEvent = (req, res) => {
  Table.Event.find({
    where: {
      eventName: req.body.eventName
    }
  })
  .then((response) => {
    let eventId = response.id
    Table.User_Event.findOrCreate({
      where: {
        userId: req.params.userId,
        eventId: eventId
      }
    })
    .spread((newResponse, isCreated) => {
      if (isCreated) {
        res.status(201).send(newResponse)
      } else {
        res.send({created: 'already exist'})
      }
    })
  })
  .catch((error) => {
    res.send(error);
  })
}


module.exports = {
  signupUser: signupUser,
  fetchUsers: fetchUsers,
  createEvent: createEvent,
  fetchUserEvents: fetchUserEvents,
  joinEvent: joinEvent
}