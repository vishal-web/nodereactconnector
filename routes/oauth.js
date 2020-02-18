const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/keys.js')[process.env.NODE_ENV];
const userModel = require('../models/userModel');

passport.use(new GoogleStrategy(
	{
		clientID: config.google.clientID,
		clientSecret: config.google.clientSecret,
		callbackURL: config.google.callbackURL
	},
	(token, tokenScret, profile, done) => {
		// console.log('user ', JSON.stringify(profile._json, null, 4));

		userModel.findOne({ googleId: profile.id }, (err, user) => {
			if (err) {
				console.error(' error found while finding ', error);
			} else {
				if (user === null || user === '') {
					new userModel({
						name: profile._json.name,
						email: profile._json.email,
						googleId: profile.id,
					}).save((err, data) => {
						if (err) {
							console.error(' error found while adding new user ', error);
						} else {
							return done(null, data);
						}
					})
				} else {
					return done(null, user);
				}
			}
		})
	}
))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // Users.findById(obj, done);
  done(null, obj);
});


router.get('/google', passport.authenticate('google', { scope: ['email','profile']}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }) ,async (req, res) => {
	// console.log('requesting user', JSON.stringify(req.user, null, 4))
	res.redirect('/');
});


module.exports = router
