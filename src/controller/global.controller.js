const resourceModel = require('../config/resource');

exports.findAllData = async (modelName, populateArr, queryObj, sortObj) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].find(queryObj, null, {
				sort: sortObj
			}).populate(populateArr)
			.then(rows => {
				resolve(rows);
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			});
	});
}

exports.findAllRows = async (modelName, populateArr, queryObj, limit, offset, sortObj) => {
	console.log(queryObj);
	const result = {};
	return new Promise((resolve, reject) => {
		resourceModel[modelName].find(queryObj, null, {
				sort: sortObj,
				limit: limit,
				skip: offset
			}).populate(populateArr)
			.then(rows => {
				if (rows.length > 0) {
					return resourceModel[modelName].countDocuments(queryObj)
						.then(count => {
							result.count = count;
							result.rows = rows;
							return resolve(result);
						}).catch(error => {
							console.log('Error:::', error);
							return reject(error);
						})
				} else {
					result.count = 0;
					result.rows = rows;
					return resolve(result);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			});
	});
}

exports.countRows = async (modelName, queryObj) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].countDocuments(queryObj)
			.then(count => {
				resolve(count);
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			});
	});
}

exports.findIdRow = async (modelName, id, populateArr) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].findById(id)
			.populate(populateArr)
			.then(row => {
				if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			});
	});
}

exports.findRow = async (modelName, queryObj, populateArr) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].find(queryObj)
			.populate(populateArr)
			.then(row => {
				if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			});
	});
}


exports.findOneRow = async (modelName, queryObj, populateArr) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].findOne(queryObj)
			.populate(populateArr)
			.then(row => {
				if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			});
	});
}

exports.createRow = async (modelName, bodyParams) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].create(bodyParams)
			.then(row => {
				if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			});
	})
}

exports.findOneAndUpdate = async (modelName, queryObj, bodyParams) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].findOneAndUpdate(queryObj, bodyParams, {
			new: true,
			upsert: true,
			setDefaultsOnInsert: true,
			runValidators: false
		}).then(row => {
			if (row) {
				resolve(row);
			} else {
				resolve(null);
			}
		}).catch(error => {
			console.log('Error:::', error);
			reject(error);
		});
	})
}

exports.findByIdAndUpdate = async (modelName, id, bodyParams, populateArr) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].findOneAndUpdate({
			_id: id
		}, bodyParams, {
			new: true,
			upsert: true,
			setDefaultsOnInsert: true,
			runValidators: false
		})
		.populate(populateArr)
		.then(row => {
			if (row) {
				resolve(row);
			} else {
				resolve(null);
			}
		}).catch(error => {
			console.log('Error:::', error);
			reject(error);
		});
	})
}

exports.findoneAndDelete = async (modelName, queryObj) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].findOneAndDelete(queryObj)
			.then(row => {
				if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			})
	})
}

exports.findByIdAndRemove = async (modelName, id, populateArr) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].findByIdAndRemove(id)
			.populate(populateArr)
			.then(row => {
				if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			})
	})
}

exports.aggregateFunction = async (modelName, aggArray) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName].aggregate(aggArray)
			.then(row => {
				if (row) {
					resolve(row);
				} else {
					resolve(null);
				}
			}).catch(error => {
				console.log('Error:::', error);
				reject(error);
			})
	})
}
