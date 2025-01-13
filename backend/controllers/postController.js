const asyncHandler = require('express-async-handler');
const Post = require('../models/post/Post.model');
const Category = require('../models/category/Category.model');
const User = require('../models/user/user.model');

const createPost = asyncHandler (async (req, res) => {
  const { description, category } = req.body;

  const categoryFound = await Category.findById(category);
  if (!categoryFound) {
    throw new Error('Category not found');
  }
  const userFound = await User.findById(req.user);
  if (!userFound) {
    throw new Error('Category not found');
  }

  const postCreated = await Post.create({
    description,
    author: req.user,
    category
  });
  categoryFound.posts.push(categoryFound?._id);

  await categoryFound.save();
  
  userFound.posts.push(postCreated?._id);
  await userFound.save();
  res.status(200).json(postCreated);
  });
const getPosts = asyncHandler(async (req, res) => {
  const {category, title, page=1, limit=10} = req.query;

  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (title) {
    filter.description = { $regex: title, $options: 'i' };
  }

  const posts = await Post.find(filter).populate('category', 'categoryName').sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
  const totalPosts = await Post.countDocuments(filter)
  res.status(200).json({posts, totalPosts});
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  const postUpdated = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    { 
      new: true 
    }
  );
  res.status(200).json(postUpdated);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post)
});

const deletePost = asyncHandler (async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Post deleted' });
});

module.exports = { createPost, getPosts, updatePost, getPost, deletePost };