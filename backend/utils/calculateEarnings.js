const Earnings = require('../models/earnings');
const Post = require('../models/post');

const calculateEarnings = async () => {
  const currentDate= new Date.now();

  const posts = await Post.find();

  for(const post of posts) {
    const newViewsCount = post.views.length - post.lastViewsCount;
    const earningsAmount = newViewsCount * 0.01;

    post.thisMonthEarnings += earningsAmount;
    post.totalEarnings += earningsAmount;

    await Earnings.create({
      user: post.author,
      post: post._id,
      amount: earningsAmount,
      calculatedOn: currentDate,
    })

    post.lastCalculatedViewsCount = post.viewrs.length;
    post.nextEarningDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    await post.save()
  }
}

module.exports = calculateEarnings;
