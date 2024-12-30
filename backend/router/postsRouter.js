const express = require('express');
const postRouter = express.Router();
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = require('../utils/fileUpload');
// cloudinaryConfig.cloudinaryConfig();

const authVerification = require('../middleware/AuthVerification');

const postController = require('../controllers/postController');

postRouter.post('/api/posts/create', authVerification, postController.createPost);

postRouter.get('/api/posts', postController.getPosts);

postRouter.put('/api/posts/update/:id', authVerification, postController.updatePost);

postRouter.get('/api/posts/:id', postController.getPost);

postRouter.delete('/api/posts/delete/:id', authVerification, postController.deletePost);

module.exports = postRouter;