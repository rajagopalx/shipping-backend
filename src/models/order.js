const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
	},
    address: {
        name: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        pincode: { type: Number, required: true}
    },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type:Number, required: true}
        }
    ]
}, {
	timestamps: {
		createdAt: "created_at",
		updatedAt: "last_updated_at"
	}
});

module.exports = mongoose.model('Order', orderSchema);
