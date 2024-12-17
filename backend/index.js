const express = require('express');
const dbConnect = require('./utils/dbConnect');
const app = express();
const cors = require('cors');
const passport = require('./utils/passportConfig');

const postsRouter = require('./router/postsRouter');
const userRouter = require('./router/userRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(passport.initialize());

app.use('/user', userRouter);

app.use('/', postsRouter);

dbConnect();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
