const asyncHandler = require('express-async-handler');
const Post = require('../models/post/Post.model');

const createPost = asyncHandler (async (req, res) => {
  const postCreated = await Post.create(req.body);
  res.status(200).json(postCreated);
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
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