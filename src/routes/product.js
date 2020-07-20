const productController = require('../controller/product.controller');

const productProperties = {
	_id: {
		type: 'string'
	}, 
	product_name: {
		type: 'string'
	},
	price: {
		type: 'number'
	}
};

const productRoutes = [
    {
        method: 'GET',
        url: '/api/products',
        schema: {
            tags: [{
                name: 'Products'
            }],
            description: 'Get Products',
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
                                properties: productProperties
                            }
                        }
                    }
                }
            }
        },
        handler: productController.getProducts
    }, {
        method: 'POST',
        url: '/api/products',
        schema: {
            tags: [{
                name: 'Products'
            }],
            description: 'Create product',
            body: {
                type: 'object',
                properties: {
                    product_name: {
                        type: 'string'
                    },
                    price: {
                        type: 'number'
                    }
                },
                required: ['product_name', 'price']
            },
            response: {
                201: {
                    type: 'object',
                    properties: productProperties
                }
            }
        },
        handler: productController.addProduct
    }
]

module.exports = productRoutes;