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
}


module.exports = {
  signupUser: signupUser,
  fetchUsers: fetchUsers
}