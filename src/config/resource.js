const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

const resourceModel = {
	"user": User,
	"product": Product,
	"order": Order
};

module.exports = resourceModel;
