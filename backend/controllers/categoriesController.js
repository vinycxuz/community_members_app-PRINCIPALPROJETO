const asyncHandler = require('express-async-handler');
const Category = require('../models/category/Category.model');

const createCategory = asyncHandler (async (req, res) => {
  const { categoryName, description } = req.body;

  const categoryFound = await Category.findOne({ categoryName, description });
  if (categoryFound) {
    return res.status(404).json({ message: 'Category exist' });
  }

  const categoryCreated = await Category.create({
    categoryName,
    author: req.user
  });
  res.status(200).json(categoryCreated);

});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const categoryUpdated = await Category.findByIdAndUpdate(
    req.params.id,
    {
      categoryName: req.body.categoryName,
      description: req.body.description,
    },
    { 
      new: true 
    }
  );
  res.status(200).json(categoryUpdated);
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'category not found' });
  }
  res.status(200).json(category)
});

const deleteCategory = asyncHandler (async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Category deleted' });
});

module.exports = { createCategory, getCategories, updateCategory, getCategory, deleteCategory };