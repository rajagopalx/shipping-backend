const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	verified: {
		email: {
			type: Boolean,
			default: false
		},
		phone: {
			type: Boolean,
			default: false
		}
	},
	social: {
		fb: {
			type: String
		},
		twitter: {
			type: String
		}
	},
	devices: [{
		device_type: Number,
		device_token: String,
		registered_at: Date
	}],
	status: {
		type: Number,
		default: 1
	},
	deleted: {
		type: Boolean,
		default: false
	},
	is_admin: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: {
		createdAt: "created_at",
		updatedAt: "last_updated_at"
	}
});

module.exports = mongoose.model('User', userSchema);
