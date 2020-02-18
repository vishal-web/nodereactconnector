const User = require('../models/userModel');
const _ = require('lodash');


exports.user_list = async (req, res) => {
	
	let count = _.has(req.query, 'count') && parseInt(req.query.count) > 0 ? parseInt(req.query.count) : 10;
	let page = _.has(req.query, 'page') && parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
	let skip = (page * count) - count;

	let users = await User.find({},{ __v: 0}).skip(skip).limit(count); 

	res.json(users);
}

exports.user_details = (req, res) => {

}

exports.user_create_post = (req, res) => {

}

exports.user_create_get = (req, res) => {

}

exports.user_update = (req, res) => {

}

// Handel delete
exports.user_delete = (req, res) => {

}