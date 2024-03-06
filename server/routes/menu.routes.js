const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu.controllers');

router.post("", menuController.createMeal);
router.get("", menuController.getAllMeals);
router.get("/:id", menuController.getMealById);
router.put("/:id", menuController.updateMeal);
router.put("/:id", menuController.updateMealQuantity);
router.delete("/:id", menuController.deleteMeal);

module.exports = router;