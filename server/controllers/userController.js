const Table = require('../models/tableModels');
const existed = { status: 'already exists' };

const signupUser = (req, res) => {
  console.log("signupUser req.body", req.body)
  Table.User
    .findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
        latitude: '100.00101010',
        longitude: '100.1010100101'
      }
    })
    .spread((response, isCreated) => {
      // console.log("signupUser res", response)
      if (isCreated) {
        res.status(201).send(response);
      } else {
  
        res.send(response);
      }
    })
    .catch(error => {
      console.log("error caught in signupUser", error)
      res.send(error);
    });
};

const fetchUsers = (req, res) => {
  Table.User
    .findAll()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.send(error);
    });
};

const editUserProfile = (req, res) => {
  let id = req.params.userId;
  console.log('req.params.id:', id);
  console.log('req:', req);
    

  Table.User
    .update({
      'name': 'blah-ba-blahrrr',
      'handle': 'suga-bear'
    }, {
      where: {
        'id': id
      }
    })
    .catch(error => {
      res.send(error);
    });
};

module.exports = {
  signupUser: signupUser,
  fetchUsers: fetchUsers,
  editUserProfile: editUserProfile
};
