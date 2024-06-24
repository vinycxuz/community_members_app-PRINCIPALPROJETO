const express = require('express');
const postRouter = express.Router();
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = require('../utils/fileUpload');
// cloudinaryConfig.cloudinaryConfig();

const postController = require('../controllers/postController');

postRouter.post('/api/posts/create', postController.createPost);

postRouter.get('/api/posts', postController.getPosts);

postRouter.put('/api/posts/update/:id', postController.updatePost);

postRouter.get('/api/posts/:id', postController.getPost);

postRouter.delete('/api/posts/delete/:id', postController.deletePost);

module.exports = postRouter;