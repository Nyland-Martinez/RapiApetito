const Meal = require("../models/menu.model");

module.exports.createMeal = async (req, res) => {
    try {
        const newMeal = await Meal.create(req.body);
        res.status(201);
        res.json(newMeal);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

module.exports.getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find().sort({ name: 1 });
        res.status(200);
        res.json(meals);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};


// Modifica tu controlador para incluir el nombre del producto
exports.getMealById = async (req, res) => {
    const { id } = req.params;
    try {
        const meal = await Meal.findById(id);
        if (!meal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        // Aquí también obtenemos el nombre del producto y lo incluimos en la respuesta
        const productName = meal.name;
        res.status(200).json({ ...meal.toJSON(), productName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.updateMeal = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMeal = await Meal.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200);
        res.json(updatedMeal);
    } catch (error) {
        console.error('Error updating Meal:', error);
        res.status(500);
        res.json(error);
    }
};

exports.updateMealQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        // Encuentra el artículo en la base de datos por su ID y actualiza la cantidad
        const updatedMeal = await Meal.findByIdAndUpdate(id, { quantity }, { new: true });

        res.json(updatedMeal); // Devuelve el artículo actualizado como respuesta
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la cantidad del artículo.' });
    }
};

module.exports.deleteMeal = async (req, res) => {
    try {
        const deletedMeal = await Meal.deleteOne({ _id: req.params.id });
        res.status(200);
        res.json(deletedMeal);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};