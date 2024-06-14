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

app.post('/api/posts/create', async (req, res) => {
  try {
    const postCreated = await Post.create(req.body);
    res.status(200).json(postCreated);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
