const router = require('express').Router();

const controller = require('./controllers');

// Connect controller methods to their corresponding routes
router.post('/reports', controller.reports.post); // Create

router.get('/reports', controller.reports.get); // Read

router.put('/reports', controller.reports.put); // Update

router.delete('/reports', controller.reports.delete); // Delete

module.exports = router;
