const express = require('express');
const categoryRouter = express.Router();

const categoryController = require('../controllers/categoriesController');
const authVerification = require('../middleware/AuthVerification');

categoryRouter.post('/api/category/create', authVerification, categoryController.createCategory);

categoryRouter.get('/api/category', categoryController.getCategories);

categoryRouter.put('/api/category/update/:id', authVerification, categoryController.updateCategory);

categoryRouter.get('/api/category/:id', categoryController.getCategory);

categoryRouter.delete('/api/category/delete/:id', authVerification, categoryController.deleteCategory);

module.exports = categoryRouter;