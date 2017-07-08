const Table = require('../models/tableModels');
const existed = {status: 'already exists'};



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
  uploadImage: uploadImage,
  fetchEventImages: fetchEventImages
}