const express = require('express');
const shortid = require('shortid');
const router = express.Router(); 
const userModel = require('../models/userModel');
const urlModel = require('../models/urlModel');
const userController = require('../controllers/userController');


const checkUserAuthenticated = (req, res, next) => {
	if (!req.user) {
		res.redirect('/');
	} else {
		next();
	}
}

router.get('/', (req, res) => {
	res.render('index', {

	});
});


router.get('/dashboard', checkUserAuthenticated, (req, res) => {
	res.render('user/dashboard', {

	})
})

router.get('/logout', (req, res, next) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				next(err);
			} else {
				res.redirect('/');
			}
		})
	}
});



router.use('/auth/',require('./oauth.js'));
router.use('/api/', require('./api.js'));
router.use('/stories', require('./stories.js'));


module.exports = router