const express = require('express');
const router = express.Router();

const {
	getStories,
	getStory,
	createStory,
	updateStory,
  deleteStory,
  storiesSample
} = require('../controllers/stories');


router.route('/')
  .get(getStories)
  .post(createStory)

router.route('/sample')
  .get(storiesSample);

router.route('/:id')
  .get(getStory)
  .put(updateStory)
  .delete(deleteStory)



module.exports = router
