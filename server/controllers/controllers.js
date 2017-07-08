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
    res.send(response);
  })
}

const post = () => {

}


module.exports = {
  signupUser: signupUser
}