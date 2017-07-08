const router = require('express').Router();
const controller = require('./controllers/controllers.js');

router.get('/user/fetchUsers', controller.fetchUsers);
router.post('/user/signup', controller.signupUser);

router.post('/event/create/:userId', controller.createEvent);
router.post('/event/joinevent/:userId', controller.joinEvent);
router.get('/event/fetchuserevents/:userId', controller.fetchUserEvents);

router.post('/image/upload/:userId', controller.uploadImage);
router.get('/image/fetcheventimages/:eventId', controller.fetchEventImages)



module.exports = router;