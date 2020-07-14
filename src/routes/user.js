const userController = require('../controller/user.controller');

const deviceProperties = {
	_id: {
		type: 'string'
	}, 
	device_type: {
		type: 'number'
	},
	device_token: {
		type: 'string'
	},
	registered_at: {
		type: 'string'
	}
};

const userProperties = {
	_id: {
		type: 'string'
	},
	name: {
		type: 'string'
	},
	email: {
		type: 'string'
	},
	phone: {
		type: 'string'
	},
	verified: {
		type: 'object',
		properties: {
			email: {
				type: 'boolean'
			},
			phone: {
				type: 'boolean'
			}
		}
	},
	social: {
		type: 'object',
		properties: {
			fb: {
				type: 'string'
			},
			twitter: {
				type: 'string'
			}
		}
	},
	status: {
		type: 'number'
	},
	deleted: {
		type: 'boolean'
	},
	is_admin: {
		type: 'boolean'
	},
	devices: {
		type: 'array',
		items: {
			type: 'object',
			properties: deviceProperties
		}
	},
	created_at: {
		type: 'string'
	},
	last_updated_at: {
		type: 'string'
	}
};

const userRoutes = [{
	method: 'GET',
	url: '/api/users/:id',
	schema: {
		tags: [{
			name: 'Users'
		}],
		description: 'Get user by id',
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					description: 'User id'
				}
			}
		},
		response: {
			200: {
				type: 'object',
				properties: userProperties
			}
		}
	},
	handler: userController.getUser
}, {
	method: 'GET',
	url: '/api/users/all',
	schema: {
		tags: [{
			name: 'Users'
		}],
		description: 'Get all users',
		querystring: {
			name: {
				type: 'string'
			},
			email: {
				type: 'string'
			},
			status: {
				type: 'number',
				enum: [0, 1]
			},
			phone: {
				type: 'number'
			},
			deleted: {
				type: 'boolean'
			},
			is_admin: {
				type: 'boolean'
			},
			order_by: {
				type: 'string'
			},
			order: {
				type: 'string'
			}
		},
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: userProperties
				}
			}
		}
	},
	handler: userController.getAllUsers
}, {
	method: 'GET',
	url: '/api/users',
	schema: {
		tags: [{
			name: 'Users'
		}],
		description: 'Get users',
		querystring: {
			name: {
				type: 'string'
			},
			email: {
				type: 'string'
			},
			status: {
				type: 'number',
				enum: [0, 1]
			},
			phone: {
				type: 'number'
			},
			deleted: {
				type: 'boolean'
			},
			is_admin: {
				type: 'boolean'
			},
			limit: {
				type: 'number'
			},
			offset: {
				type: 'number'
			},
			order_by: {
				type: 'string'
			},
			order: {
				type: 'string'
			}
		},
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
							properties: userProperties
						}
					}
				}
			}
		}
	},
	handler: userController.getUsers
}, {
	method: 'POST',
	url: '/api/users',
	schema: {
		tags: [{
			name: 'Users'
		}],
		description: 'Create user',
		body: {
			type: 'object',
			properties: {
				name: {
					type: 'string'
				},
				email: {
					type: 'string'
				},
				phone: {
					type: 'number'
				},
				
				fb: {
					type: 'string'
				},
				twitter: {
					type: 'string'
				},
				status: {
					type: 'number',
					enum: [0, 1],
					default: 1
				}
			},
			required: ['name', 'email', 'phone']
		},
		response: {
			201: {
				type: 'object',
				properties: userProperties
			}
		}
	},
	handler: userController.addUser
}, {
	method: 'PUT',
	url: '/api/users/:id',
	schema: {
		tags: [{
			name: 'Users'
		}],
		description: 'Update user data',
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					description: 'User id'
				}
			}
		},
		body: {
			type: 'object',
			properties: {
				name: {
					type: 'string'
				},
				email: {
					type: 'string'
				},
				phone: {
					type: 'number'
				},
				fb: {
					type: 'string'
				},
				twitter: {
					type: 'string'
				},
				email_verified: {
					type: 'boolean'
				},
				phone_verified: {
					type: 'boolean'	
				},
				status: {
					type: 'number',
					enum: [0, 1],
					default: 1
				}
			}
		},
		response: {
			200: {
				type: 'object',
				properties: userProperties
			}
		}
	},
	handler: userController.updateUser
}, {
	method: 'PUT',
	url: '/api/users/:id/delete',
	schema: {
		tags: [{
			name: 'Users'
		}],
		description: 'Soft delete user by id',
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					description: 'User id'
				}
			}
		},
		body: {
			type: 'object',
			properties: {
				deleted: {
					type: 'boolean'
				}
			},
			required: ['deleted']
		},
		response: {
			200: {
				type: 'object',
				properties: userProperties
			}
		}
	},
	handler: userController.softDeletedUser
}, {
	method: 'DELETE',
	url: '/api/users/:id',
	schema: {
		tags: [{
			name: 'Users'
		}],
		description: 'Delete user by id',
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					description: 'User id'
				}
			}
		},
		response: {
			200: {
				type: 'object',
				properties: userProperties
			}
		}
	},
	handler: userController.deletedUser
}];

module.exports = userRoutes;