const express = require('express');
const asyncHandler = require('express-async-handler');
const postRouter = express.Router();

const Post = require('../models/post/Post.model');

postRouter.post('/api/posts/create', asyncHandler (async (req, res, next) => {
  const postCreated = await Post.create(req.body);
  res.status(200).json(postCreated);
}));

postRouter.get('/api/posts', asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
}));

postRouter.put('/api/posts/update/:id', asyncHandler(async (req, res) => {
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
}));

postRouter.get('/api/posts/:id', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post)
}));

postRouter.delete('/api/posts/delete/:id', asyncHandler (async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Post deleted' });
}));

module.exports = postRouter;