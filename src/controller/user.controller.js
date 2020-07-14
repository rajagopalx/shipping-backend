const _ = require('lodash');
const config = require('../config/config');
const globalService = require('./global.controller');
const { NotFound } = require('http-errors');
const boom = require('boom');
const modelName = 'user';

//Get all users
exports.getAllUsers = async (req, reply) => {
	try {
		let queryObj = {};
		let sort = {
			"created_at": "desc"
		};

		if ((req.query.order_by && req.query.order) && (req.query.order == 'asc' || req.query.order == 'desc')) {
			sort = {};
			sort[req.query.order_by] = req.query.order;
		}

		if (req.query.name) {
			queryObj.name = {
				$regex: new RegExp(".*" + req.query.name, "i")
			}
		}

		if (req.query.email) {
			queryObj.email = {
				$regex: new RegExp(".*" + req.query.email, "i")
			}
		}

		if (req.query.phone) {
			queryObj.phone = {
				$regex: new RegExp(".*" + req.query.phone, "i")
			}
		}

		if (req.query.id) {
			queryObj._id = req.query.id;
		}

		if (req.query.deleted) {
			queryObj.deleted = req.query.deleted;
		} else {
			queryObj.deleted = false;
		}

		if (req.query.status) {
			queryObj.status = req.query.status;
		}

		const users = await globalService.findAllData(modelName, [], queryObj, sort);
		return users;

	} catch (err) {
		throw boom.boomify(err);
	}
}

// Get users
exports.getUsers = async (req, reply) => {
	try {
		let queryObj = {};
		let limit = req.query.limit ? parseInt(req.query.limit) : config.ROWS_LIMIT;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let sort = {
			"created_at": "desc"
		};

		if ((req.query.order_by && req.query.order) && (req.query.order == 'asc' || req.query.order == 'desc')) {
			sort = {};
			sort[req.query.order_by] = req.query.order;
		}

		if (req.query.name) {
			queryObj.name = {
				$regex: new RegExp(".*" + req.query.name, "i")
			}
		}

		if (req.query.email) {
			queryObj.email = {
				$regex: new RegExp(".*" + req.query.email, "i")
			}
		}

		if (req.query.phone) {
			queryObj.phone = {
				$regex: new RegExp(".*" + req.query.phone, "i")
			}
		}	

		if (req.query.id) {
			queryObj._id = req.query.id;
		}

		if (req.query.deleted) {
			queryObj.deleted = req.query.deleted;
		} else {
			queryObj.deleted = false;
		}

		if (req.query.status) {
			queryObj.status = req.query.status;
		}

		const users = await globalService.findAllRows(modelName, [], queryObj, limit, offset, sort);
		return users;
	} catch (err) {
		throw boom.boomify(err);
	}
}

// Get single user by ID
exports.getUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = await globalService.findIdRow(modelName, id, []);
		if (!user) {
			throw new NotFound('User id not found');
		}
		return user;
	} catch (err) {
		throw boom.boomify(err);	
	}
}

// add user
exports.addUser = async(req, reply) => {
	try {
		req.body['devices'] = [];
		if (req.body.device_type && req.body.device_token) {
			req.body['devices'].push({
				'device_type': req.body.device_type,
				'device_token': req.body.device_token,
				'registered_at': new Date()
			});
		};

		req.body['social'] = {};

		if (req.body.fb) {
			req.body['social']['fb'] = req.body.fb;			
		}

		if (req.body.twitter) {
			req.body['social']['twitter'] = req.body.twitter;
		}
		
		const user = await globalService.createRow(modelName, req.body);
		return reply.code(201).send(user);
	} catch (err) {
		throw boom.boomify(err);	
	}
}

//update user
exports.updateUser = async(req, reply) => {
	try {
		const id = req.params.id;
		const user = await globalService.findIdRow(modelName, id, []);
		if (!user) {
			throw new NotFound('User id not found');
		}

		req.body['social'] = user.social;
		if (req.body.fb) {
			req.body['social']['fb'] = req.body.fb;			
		}
		if (req.body.twitter) {
			req.body['social']['twitter'] = req.body.twitter;
		}

		req.body['verified'] = user.verified;
		req.body['verified']['email'] = req.body.email_verified;
		req.body['verified']['phone'] = req.body.phone_verified;

		req.body['devices'] = user['devices'];
		if (req.body.device_token && req.body.device_type) {
			const deviceToken = _.find(user.devices, function(obj) {
				return obj.device_token == req.body.device_token &&
					obj.device_type == req.body.device_type;
			});
			if (!deviceToken) {
				req.body['devices'].push({
					device_token: req.body.device_token,
					device_type: req.body.device_type,
					registered_at: new Date()
				});
			}
		}
		const userRsp = await globalService.findByIdAndUpdate(modelName, id, req.body, []);
		return userRsp;
	} catch (err) {
		throw boom.boomify(err);	
	}
}

// Delete a user
exports.deletedUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = await globalService.findByIdAndRemove(modelName, id, []);
		if (!user) {
			throw new NotFound('User id not found');
		}
		return user;
	} catch (err) {
		throw boom.boomify(err);	
	}
}

// Soft delete by user
exports.softDeletedUser = async (req, reply) => {
	try {
		const id = req.params.id;
		const user = await globalService.findIdRow(modelName, id, []);
		if (!user) {
			throw new NotFound('User id not found');
		}
		user.deleted = req.body.deleted;
		const userRsp = await user.save();
		return userRsp;
	} catch (err) {
		throw boom.boomify(err);	
	}
}
