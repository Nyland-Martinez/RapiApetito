const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId, 
        ref: 'Meal', // Referencia al modelo Meal
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;