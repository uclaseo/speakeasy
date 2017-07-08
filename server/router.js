const router = require('express').Router();
const mongoController = require('./controllers/mongoController.js');

router.get('/message/:eventId', mongoController.fetchMessagesForRoom);
router.post('/message/:eventId', mongoController.postMessageToRoom);

router.get('/dm/:dmId', mongoController.fetchDirectMessages);
router.post('/dm/:dmId', mongoController.postDirectMessage);

module.exports = router;