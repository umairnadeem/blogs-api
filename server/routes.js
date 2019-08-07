const router = require('express').Router();

const controller = require('./controllers');

// Connect controller methods to their corresponding routes

/* GET Routes */
router.get('/ping', controller.ping.get);

router.get('/posts', controller.posts.get);

module.exports = router;
