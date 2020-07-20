const _ = require('lodash');
const config = require('../config/config');
const globalService = require('./global.controller');
const { NotFound } = require('http-errors');
const boom = require('boom');
const modelName = 'order';


// Get users
exports.getOrders = async (req, reply) => {
	try {
		let queryObj = {};
		let limit = req.query.limit ? parseInt(req.query.limit) : config.ROWS_LIMIT;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;
		let sort = {};
        const orders = await globalService.findAllRows(modelName, ['products.product'], queryObj, limit, offset, sort);
        console.log(orders.rows[0].products);
		return orders;
	} catch (err) {
		throw boom.boomify(err);
	}
}