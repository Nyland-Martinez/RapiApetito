const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controllers');

router.post("", cartController.addToCart);
router.get("", cartController.getAllOrders);
router.get("/:id", cartController.getOrderById);
router.delete("/:id", cartController.deleteCart);


module.exports = router;