const express = require('express');
const dbConnect = require('./utils/dbConnect');
const app = express();
const cors = require('cors');
const postsRouter = require('./router/postsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/', postsRouter);

dbConnect();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
