const router = require('express').Router();
const controller = require('./controllers/controllers.js');

router.get('/', controller.get);
router.get('/', controller.post);

module.exports = router;