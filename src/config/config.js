module.exports = {
	PORT: process.env.PORT || 4000,
	IP: process.env.IP || "0.0.0.0",
	HOST: process.env.HOST || 'localhost',
	MONGO_HOST_URL: process.env.MONGO_HOST_URL || 'mongodburl',
	ROWS_LIMIT: process.env.ROWS_LIMIT || 10
};
