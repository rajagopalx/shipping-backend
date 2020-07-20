const userRoutes = require('./user');
const productRoutes = require('./product');
const orderRoutes = require('./order');

const routes = [...userRoutes, ...productRoutes, ...orderRoutes];

module.exports = routes;
