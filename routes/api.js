const express = require('express');
const router = express.Router();
const stories = require('./stories');


router.use('/stories', stories);

module.exports = router
