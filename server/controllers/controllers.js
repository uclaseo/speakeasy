const Table = require('../models/tableModels');

const existed = {status: 'already exists'};


const signupUser = (req, res) => {
  Table.User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email,
      latitude: '100.00101010',
      longitude: '100.1010100101'
    }
  })
  .spread((response, isCreated) => {
    if (isCreated) {
      res.status(201).send(response);
    } else {
      res.send(existed)
    }
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
  Table.Event.findOrCreate({
    where: {
      eventName: eventName,
      userId: req.params.userId
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
  Table.Event.findOne({
    where: {
      eventName: req.body.eventName
    }
  })
  .then((response) => {
    let eventId = response.id;
    Table.User_Event.findOrCreate({
      where: {
        userId: req.params.userId,
        eventId: eventId
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
  })
  .catch((error) => {
    res.send(error);
  });
};

const uploadImage = (req, res) => {
  Table.Image.findOrCreate({
    where: {
      name: req.body.name,
      imageLink: req.body.imageLink,
      userId: req.params.userId,
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

const fetchEventImages = (req, res) => {
  Table.Image.findAll({
    where: {
      eventId: req.params.eventId
    },
    include: [
      {
        model: Table.User
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

module.exports = {
  signupUser: signupUser,
  fetchUsers: fetchUsers,
  createEvent: createEvent,
  fetchUserEvents: fetchUserEvents,
  joinEvent: joinEvent,
  uploadImage: uploadImage,
  fetchEventImages: fetchEventImages
}