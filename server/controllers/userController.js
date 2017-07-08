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




module.exports = {
  signupUser: signupUser,
  fetchUsers: fetchUsers
}