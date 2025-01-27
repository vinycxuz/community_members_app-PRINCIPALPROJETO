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
  const postFound = await Post.findById(post);
  const userId = req.user
  if (userId){
    await Post.findByIdAndUpdate(req.params.id, {
      $addToSet: 
        {viewers: userId},
      $inc: {viewsCount: 1}
    }, {new: true})
  }
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
      postFound.viewsCount = postFound.viewsCount + 1;
      await postFound.save();
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

const likePost = asyncHandler (async (req, res) => {
  const postId = req.params.id;
  const userId = req.user;
  const post = await Post.findById(postId);

  if(post?.dislikes.includes(userId)) {
    post?.dislikes?.pull(userId);
  }

  if(post?.likes.includes(userId)) {
    post?.likes?.pull(userId);
  } else {
    post?.likes?.push(userId);
  }
  await post.save();

  res.json({
    message: "Post Liked"
  })
})

const dislikePost = asyncHandler (async (req, res) => {
  const postId = req.params.id;
  const userId = req.user;
  const post = await Post.findById(postId);

  if(post?.likes.includes(userId)) {
    post?.likes?.pull(userId);
  }

  if(post?.dislikes.includes(userId)) {
    post?.dislikes?.pull(userId);
  } else {
    post?.dislikes?.push(userId);
  }

  await post.save();

  res.json({
    message: "Post Disliked"
  })
})

module.exports = { createPost, getPosts, updatePost, getPost, deletePost, likePost, dislikePost }; 