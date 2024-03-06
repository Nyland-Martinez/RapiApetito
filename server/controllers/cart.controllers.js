const Cart = require('../models/cart.model');


module.exports.addToCart = async (req, res) => {
    try {
        const newItem = await Cart.create(req.body)
        res.status(201);
        res.json(newItem);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
};
module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Cart.find().sort({ productId: 1 });
        res.status(200);
        res.json(orders);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};

module.exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Cart.findOne({ _id: id });
        res.status(200);
        res.json(order);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};


module.exports.deleteCart = async (req, res) => {
    try {
        const deletedCart  = await Cart.deleteOne({ _id: req.params.id });
        res.status(200);
        res.json(deletedCart);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};