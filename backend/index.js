const express = require('express');
const cron = require('node-cron');
const dbConnect = require('./utils/dbConnect');
const app = express();
const cors = require('cors');
const passport = require('./utils/passportConfig');
const cookieParser = require('cookie-parser');

const postsRouter = require('./router/postsRouter');
const userRouter = require('./router/userRouter');
const categoryRouter = require('./router/categoryRouter');
const planRouter = require('./router/planRouter');
const paymentRouter = require('./router/paymentRouter');
const earningsRouter = require('./router/earningsRouter');
const calculatedEarnings = require('./utils/calculateEarnings');

// calculatedEarnings();

cron.schedule(
  "59 23 * * * ",
  async () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (today.getMonth() !== tomorrow.getMonth()) {
      calculateEarnings(); //calc earnings
    }
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(passport.initialize());

app.use('/user', userRouter);

app.use('/', postsRouter);

app.use('/', categoryRouter);

app.use('/', planRouter);

app.use('/', paymentRouter);

app.use('/', earningsRouter);

dbConnect();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
