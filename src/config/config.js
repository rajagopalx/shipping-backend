module.exports = {
	PORT: process.env.PORT || 4000,
	IP: process.env.IP || "0.0.0.0",
	HOST: process.env.HOST || 'localhost',
	MONGO_HOST_URL: process.env.MONGO_HOST_URL || 'mongodb+srv://raja:raja@cluster0.fonw4.mongodb.net/imdb?retryWrites=true&w=majority',
	ROWS_LIMIT: process.env.ROWS_LIMIT || 10
};
