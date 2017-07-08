const router = require('express').Router();
const controller = require('./controllers/controllers.js');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');
const imageController = require('./controllers/imageController');

router.get('/user/fetchUsers', userController.fetchUsers);
router.post('/user/signup', userController.signupUser);

router.post('/event/create/:userId', eventController.createEvent);
router.post('/event/joinevent/:userId', eventController.joinEvent);
router.get('/event/fetchuserevents/:userId', eventController.fetchUserEvents);
router.get('/event/searchevents', eventController.searchEvents)

router.post('/image/upload/:userId', imageController.uploadImage);
router.get('/image/fetcheventimages/:eventId', imageController.fetchEventImages);
router.get('/image/fetchusereventimages/:userId/:eventId', imageController.fetchUserEventImages);



module.exports = router;