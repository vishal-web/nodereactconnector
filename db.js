const mongoose = require('mongoose');
// const mongodb = 'mongodb://node-story-teller-user:node123456@ds251877.mlab.com:51877/node-story-teller';
const config = require('./config/keys');

const connectDB = async () => {
	return new Promise((resolve, reject) => {
		return mongoose.connect(config.development.mongoURI, {useNewUrlParser : true, useUnifiedTopology: true}, (err, connect) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(`MongoDB Connected ${connect.host}`);
			}
		})
	})
}

module.exports = connectDB;
