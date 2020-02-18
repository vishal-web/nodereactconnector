const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name : String,
	email: String,
	mobile: String,
	googleId: String,
	facebookId: String,
	created_at: {type : Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);