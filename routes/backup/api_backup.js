const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const userModel = require('../models/userModel');
const urlModel = require('../models/urlModel');
const userController = require('../controllers/userController');


router.get('/user', userController.user_list);


router.post('/user', async (req, res) => {
	const { name, email, mobile } = req.body;

	let userExist = await userModel.findOne({email});
	if (userExist) {
		res.json(userExist);
	} else {
		const createUser = new userModel({
			name,
			email,
			mobile
		});
		createUser.save();
		res.json(createUser);
	}
});


router.post('/url', async (req, res) => {
	const { longUrl } = req.body;

 	// create short url
	const urlCode = shortid.generate();

	// check url already exist
	const urlExist = await urlModel.findOne({longUrl});

	// port
	const PORT = req.app.locals.PORT;

	// short url
	const shortUrl = 'http://localhost:'+PORT+'/'+urlCode;

	if (urlExist) {
		res.send(urlExist);
	} else {

	 	let createUrl = new urlModel({
	 		urlCode,
	 		longUrl,
	 		shortUrl,
	 		date : new Date
	 	});

	 	await createUrl.save();
	 	res.json(createUrl);
	}
})

module.exports = router
