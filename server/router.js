const router = require('express').Router();
const controller = require('./controllers/controllers.js');

router.post('/signup/', controller.signupUser);

module.exports = router;