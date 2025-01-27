const Earnings = require('../models/earning/Earning.model');
const Post = require('../models/post/Post.model');

const calculateEarnings = async () => {
  const currentDate = new Date();

  const posts = await Post.find();

  for(const post of posts) {
    const newViewsCount = post.viewers.length - post.lastCalculatedViewsCount;
    const earningsAmount = newViewsCount * 0.01;

    post.thisMonthEarnings += earningsAmount;
    post.totalEarnings += earningsAmount;

    await Earnings.create({
      user: post.author,
      post: post._id,
      amount: earningsAmount,
      calculatedOn: currentDate,
    })

    post.lastCalculatedViewsCount = post.viewers.length;
    post.nextEarningDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    await post.save()
  }
}

module.exports = calculateEarnings;
