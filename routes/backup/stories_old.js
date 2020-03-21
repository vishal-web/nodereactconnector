const express = require('express');
const router = express.Router();
const storiesController = require('../controllers/storiesController');

router.get('/', storiesController.storiesList);
router.get('/add', storiesController.storiesCreate);
router.post('/add', storiesController.storiesCreate);
router.get('/view/:id', storiesController.storiesView);
router.get('/sample', storiesController.storiesSample);


module.exports = router
