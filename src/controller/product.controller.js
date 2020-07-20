const _ = require('lodash');
const config = require('../config/config');
const globalService = require('./global.controller');
const { NotFound } = require('http-errors');
const boom = require('boom');
const modelName = 'product';


// Get users
exports.getProducts = async (req, reply) => {
	try {
		let queryObj = {};
		let limit = req.query.limit ? parseInt(req.query.limit) : config.ROWS_LIMIT;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let sort = {};
        const products = await globalService.findAllRows(modelName, [], queryObj, limit, offset, sort);
		return products;
	} catch (err) {
		throw boom.boomify(err);
	}
}

exports.addProduct = async(req, reply) => {
	try {
		const product = await globalService.createRow(modelName, req.body);
		return reply.code(201).send(product);
	} catch (err) {
		throw boom.boomify(err);	
	}
}