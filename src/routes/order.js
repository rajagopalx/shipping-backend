const orderController = require('../controller/order.controller');

const orderProperties = {
	_id: {
		type: 'string'
    }, 
    amount: {
        type: 'number'
    },
    address: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            city: { type: 'string' },
            street: { type: 'string' },
            pincode: { type: 'number' }
        }
    },
    products: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
                product: {
                    type: 'object',
                    properties: {
                        product_name: { type: 'string' },
                        price: {type: 'number'}
                    }
                },
                quantity: { type: 'number' }
            }
		}
	}
};

const orderRoutes = [
    {
        method: 'GET',
        url: '/api/orders',
        schema: {
            tags: [{
                name: 'Orders'
            }],
            description: 'Get Orders',
            querystring: {},
            response: {
                200: {
                    type: 'object',
                    properties: {
                        count: {
                            type: 'number'
                        },
                        rows: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: orderProperties
                            }
                        }
                    }
                }
            }
        },
        handler: orderController.getOrders
    }
]

module.exports = orderRoutes;