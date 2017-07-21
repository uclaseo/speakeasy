const Table = require('../models/tableModels');
const existed = {status: 'already exists'};



const createEvent = (req, res) => {
  Table.Event.findOrCreate({
    where: {
      eventName: req.body.eventName,
      password: req.body.password,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      userId: req.body.userId,
      isLive: req.body.isLive,
      eventPhoto: req.body.eventPhoto
    }
  })
  .spread((response, isCreated) => {
    if (isCreated) {
      Table.User_Event.findOrCreate({
        where: {
          userId: req.body.userId,
          eventId: response.id
        }
      });
      res.status(201).send(response);
    } else {
      res.send(existed);
    }
  })
  .catch((error) => {
    res.send(error);
  });
};

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
  });
};




const joinEvent = (req, res) => {
  Table.User_Event.findOrCreate({
    where: {
      userId: req.body.userId,
      eventId: req.body.eventId
    }
  })
  .spread((response, isCreated) => {
    if (isCreated) {
      res.status(201).send(response);
    } else {
      res.send(existed);
    }
  })
  .catch((error) => {
    res.send(error);
  });
};

const searchEvents = (req, res) => {
  Table.Event.findAll({
    where: {
      isLive: true
    }
  })
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.send(error);
  });
};

const closeEvent = (req, res) => {
  Table.Event.update({
    isLive: false
  },{ where: { id: req.body.event_id }})
    .then(() => {
      res.status(201).send('event closed');
    })
    .catch((err) => {
      console.error('error closing event ', err);
    })
}


module.exports = {

  createEvent: createEvent,
  fetchUserEvents: fetchUserEvents,
  joinEvent: joinEvent,
  searchEvents: searchEvents,
  closeEvent: closeEvent
}