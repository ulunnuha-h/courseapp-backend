const express = require('express')
const router = express.Router();
const Controller = require('../controllers/categories');

// GET /categories
// POST /categories
router.route('/')
    .get(Controller.getCategories)
    .post(Controller.addCategory)

// GET /categories/:id
// PATCH /categories/:id
// DELETE /categories/:id
router.route('/:id')
    .get(Controller.getCategoryById)
    .delete(Controller.deleteCategory)
    .patch(Controller.updateCategory)

module.exports = router;