const express = require('express');
const categoryRouter = express.Router();

const categoryController = require('../controllers/categoriesController');

categoryRouter.post('/api/category/create', categoryController.createCategory);

categoryRouter.get('/api/categors', categoryController.getCategories);

categoryRouter.put('/api/category/update/:id', categoryController.updateCategory);

categoryRouter.get('/api/category/:id', categoryController.getCategory);

categoryRouter.delete('/api/category/delete/:id', categoryController.deleteCategory);

module.exports = categoryRouter;