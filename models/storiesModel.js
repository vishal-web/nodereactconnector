const mongoose = require('mongoose');


const storiesSchema = new mongoose.Schema({
	title: String,
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	status: String,
	allowComment: Boolean,
	comments: [{
		text: String,
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}],
	description: String,
	created_at: {type: Date, default: Date.now }
})

module.exports = mongoose.model('Stories', storiesSchema);
