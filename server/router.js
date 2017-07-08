const router = require('express').Router();
const controller = require('./controllers/controllers.js');

router.get('/user/fetchUsers', controller.fetchUsers);
router.post('/user/signup/', controller.signupUser);

module.exports = router;