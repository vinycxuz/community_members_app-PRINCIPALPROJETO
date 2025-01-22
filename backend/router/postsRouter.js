const express = require('express');
const postRouter = express.Router();
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = require('../utils/fileUpload');
// cloudinaryConfig.cloudinaryConfig();

const authVerification = require('../middleware/AuthVerification');
const checkUserPlan = require('../middleware/checkUserPlan');
const isAccountVerified = require('../middleware/isAccountVerified');

const postController = require('../controllers/postController');

postRouter.post('/api/posts/create', authVerification, checkUserPlan, isAccountVerified, postController.createPost);

postRouter.get('/api/posts', postController.getPosts);

postRouter.put('/api/posts/update/:id', authVerification, postController.updatePost);

postRouter.get('/api/posts/:id', postController.getPost);

postRouter.delete('/api/posts/delete/:id', authVerification, postController.deletePost);

postRouter.put('/api/posts/like/:id', authVerification, postController.likePost);

postRouter.put('/api/posts/dislike/:id', authVerification, postController.dislikePost);

module.exports = postRouter;