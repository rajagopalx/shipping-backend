const config = require('./config');

exports.options = {
	routePrefix: '/documentation',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'Fastify API',
			description: 'Swagger Documentation for fastify Rest API',
			version: '1.0.0'
		},
		host: config.HOST + ':' + config.PORT,
		schemes: ['http'],
		consumes: ['application/json', 'multipart/form-data'],
		produces: ['application/json', 'multipart/form-data'],
		securityDefinitions: {
			Bearer: {
				type: 'apiKey',
				name: 'Authorization',
				in : 'header'
			}
		}
	}
}