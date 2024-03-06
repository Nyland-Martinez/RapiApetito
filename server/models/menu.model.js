const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Meal name is mandatory"],
        minlength: [2, "Meal name must be at least 2 characters or more"]
    },
    description: {
        type: String,
        required: [true, "Meal description is mandatory"],
        minlength: [2, "Meal description must be at least 2 characters or more"]
    },
    price: {
        type: Number,
        required: [true, "Meal price is mandatory"],
        min: [0, "Price must be a positive number"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity of meal is mandatory"],
        min: [0, "Quantity must be a positive number"],
    }

}, {timestamps: true, versionKey: false});

const Meal = new mongoose.model("Meal", MealSchema);

module.exports = Meal;
