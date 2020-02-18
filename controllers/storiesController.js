const storiesModel = require('../models/storiesModel');
const axios = require('axios');
const _ = require('lodash');
const { check, validationResult } = require('express-validator');
const { ucFirst } = require('../helper');

exports.storiesList = (req, res) => {
	const l = {
		path: req.path,
		originalUrl: req.originalUrl,
		url: req.url
	}

	// console.log(Math.ceil(totalCount / nPerPage))

	let page = parseInt(req.query.page) === 0 ? 1 : parseInt(req.query.page);
	let nPerPage = 15;
	let skip = page > 0 ? ((page - 1) * nPerPage) : 0;

	storiesModel
		.find()
		.populate('postedBy')
		.sort({ created_at: -1 })
		.skip(skip)
		.limit(nPerPage)
		.exec((err, data) => {
			if (err) {
				data = [];
			}

			if (data.length > 0) {
				storiesModel.countDocuments({ postedBy: '5d835f678c3d080016e0617b' } , (errCount, totalCount) => {
					
					if (errCount) {
						totalCount = 0; 
					}

					res.render('stories/index', {
						stories: data,
						current: page,
						total: totalCount,
						pages: Math.ceil(totalCount / nPerPage),
						ucFirst
					});
				})
			}
		})

}

exports.storiesCreate = async (req, res) => {
	let data = { headline: 'Add Stories', user: req.user },
		flash_type = '',
		flash_message = '',
		returnData = {},
		errors = {};

	if (req.method === 'POST') {
		let { title, status, description, allowed } = req.body;
		let fields = ['title', 'status', 'description'];

		fields.forEach((row, index) => (_.isEmpty(req.body[row])) ?
			errors[row] = `${ucFirst(row)} is required` : null
		)

		data = { errors, title, status, description, allowed, ...data };

		if (!_.isEmpty(errors)) {
			res.render('stories/add', data);
		}

		if (JSON.stringify(errors) === '{}') {
			const createStory = new storiesModel({
				title: title,
				description: description,
				status: status,
				postedBy: req.user._id,
				allowComment: Boolean(allowed),
			})

			await createStory.save((err, storyData) => {
				if (err) {
					flash_type = 'error';
					flash_message = 'Something went wrong while adding story.';
				} else {
					flash_type = 'success';
					flash_message = 'Your story has been successfully addded.';
				}
				req.flash(flash_type, flash_message);
				res.render('stories/add', {
					...data,
					flash_success: req.flash('success'),
					flash_error: req.flash('error'),
				});
			});
			// console.log(storyStatus);
		}
	}

	if (req.method === 'GET') {
		res.render('stories/add', data);
	}
}

exports.storiesDelete = (req, res) => {

}

exports.storiesUpdate = (req, res) => {

}

exports.storiesView = (req, res) => {
	let headline;
	storiesModel.findOne(
		{ _id: req.params.id }
	).populate({
		path: 'postedBy', select: 'name email'
	}).exec((err, data) => {

		if (!err && !_.isEmpty(data)) {
			headline = ucFirst(data.title);
		}

		res.render('stories/view', {
			headline,
			data
		});
	})
}

exports.stories_api = (req, res) => {

}

exports.storiesSample = (req, res) => {
	axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
		const data = response.data;
		if (!_.isEmpty(data)) {
			data.forEach((row, err) => {
				const createStory = new storiesModel({
					title: row.title,
					status: 'active',
					postedBy: req.user._id,
					description: row.body,
					allowComment: 1,
				});
				// createStory.save((err,data) => {
				// 	if (!err) {
				// 		console.log(data);
				// 	}
				// })
			})
		}
	}).catch(err => {
		console.log('Not running');
	})
}
