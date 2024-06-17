const express = require('express');
const dbConnect = require('./utils/dbConnect');
const app = express();
const cors = require('cors');

const Post = require('./models/post/Post.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

dbConnect();

app.post('/api/posts/create', async (req, res, next) => {
  try {
    const postCreated = await Post.create(req.body);
    res.status(200).json(postCreated);
  }
  catch (error) {
    next(error);
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/posts/update/:id', async (req, res) => {
  try {
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
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/posts/delete/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
