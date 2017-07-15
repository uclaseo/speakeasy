const router = require('express').Router();
const mongoController = require('./controllers/mongoController.js');
const controller = require('./controllers/controllers.js');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');
const imageController = require('./controllers/imageController');

const config = require('../configJwt');
const jwt = require('express-jwt');
const authCheck = jwt({
  secret: new Buffer(config.secret),
  audience: config.audience
});

router.get('/message/:eventId', mongoController.fetchMessagesForEvent);
router.post('/message/', mongoController.postMessageToEvent);

router.get('/dm/:dmId', mongoController.fetchDirectMessages);
router.post('/dm/', mongoController.postDirectMessage);

router.get('/user/fetchUsers', userController.fetchUsers);
router.post('/user/signup', userController.signupUser);
router.get('/user/profile/:userId', userController.editUserProfile); //nate
// router.get('/user/fetchSuggestedFriends', userController.fetchSuggestedFriends) //Michael


router.post('/event/create', eventController.createEvent);
router.post('/event/joinevent', eventController.joinEvent);
router.get('/event/fetchuserevents/:userId', eventController.fetchUserEvents);
router.get('/event/searchevents', eventController.searchEvents)
router.put('/event/close', eventController.closeEvent);


//photo uploading

router.post('/event/image/upload/geturl', imageController.getUrl);
router.post('/event/image/upload', imageController.upload);
router.get('/event/image/fetcheventimages/:eventId', imageController.fetchEventImages);
router.get('/event/image/fetchusereventimages/:userId/:eventId', imageController.fetchUserEventImages);





module.exports = router;