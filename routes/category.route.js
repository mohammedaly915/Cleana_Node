const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const verifyToken = require('../middlewares/verifyToken');

// Route to get all categories and add a new category
router.route('/')
  .get(categoryController.getCategories)
  .post(verifyToken, categoryController.addCategory);

// Routes to get, update, and delete a category by ID
router.route('/:id')
  .get(categoryController.getCategoryById)
  .patch(verifyToken, categoryController.updateCategory)
  .delete(verifyToken, categoryController.deleteCategory);

module.exports = router;
