const router = require('express').Router();
const controller = require('./controllers/controllers.js');

router.get('/user/fetchUsers', controller.fetchUsers);
router.post('/user/signup', controller.signupUser);

router.post('/event/:userId/create', controller.createEvent);

router.get('/user/:userId/fetchuserevents', controller.fetchUserEvents);
router.post('/user/:userId/joinevent', controller.joinEvent);


module.exports = router;