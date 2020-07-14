// Require the framework and instantiate it
const fastify = require('fastify')({
	logger: true
});
const config = require('./src/config/config');
const mongoose = require('mongoose');
const swaggerDoc = require('fastify-swagger');
const swagger = require('./src/config/swagger');
const routes = require('./src/routes');
const Ajv = require('ajv');
const ajv = new Ajv({
	useDefaults: true,
	coerceTypes: true,
	$data: true,
	extendRefs: true
});

// Connect to DB
mongoose.connect(config.MONGO_HOST_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log("Mongodb connected"))
	.catch(err => console.log(err));

// Declare a route
fastify.get('/', async(req, reply) => {
	return 'Welcome to Fastify API'
});

fastify.setSchemaCompiler((schema) => ajv.compile(schema));

//require fastify icon
fastify.register(require('fastify-favicon'))

// Register Swagger
fastify.register(swaggerDoc, swagger.options);

// routes import to fastify
routes.forEach((route, index) => {
	fastify.route(route)
});

// self start fatify server
(async() => {
	try {
		await fastify.listen(config.PORT, config.IP);
		fastify.log.info(`server listening on ${fastify.server.address().port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
