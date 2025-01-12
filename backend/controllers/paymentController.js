const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Plan = require('../models/plan/Plan.model');

const payment = asyncHandler(async (req, res) => {
  const {subscriptionPlanId, paymentMethodId} = req.body;

  if(!mongoose.isValidObjectId(subscriptionPlanId)) {
    return res.status(400).json({ message: 'Invalid subscription plan ID' });
  }

  const plan = await Plan.findById(subscriptionPlanId);

  if(!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }

  const user = req.user;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan.price * 100,
      currency: 'usd',
      metadata: {
        userId: user?.toString(),
        userEmail: user?.email,
        subscriptionPlanId,
      }
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
      userEmail: user?.email,
      subscriptionPlanId,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = { payment };