const router = require('express').Router();

const controller = require('./controllers');

// Connect controller methods to their corresponding routes

/* Create */
router.post('/reports', controller.reports.post);

/* Read */
router.get('/reports/:id', controller.reports.getOne);

router.get('/reports', controller.reports.getAll);

/* Update */
router.put('/reports/:id', controller.reports.putId);

router.put('/reports', controller.reports.put);

/* Delete */
router.delete('/reports/:id', controller.reports.deleteId);

router.delete('/reports', controller.reports.delete);

module.exports = router;
