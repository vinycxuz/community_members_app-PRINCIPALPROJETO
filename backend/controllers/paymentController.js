const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Plan = require('../models/plan/Plan.model');
const User = require('../models/user/user.model');
const Payment = require('../models/payment/Payment.model');

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
      currency: 'brl',
      metadata: {
        userId: user?.toString(),
        userEmail: user?.email,
        subscriptionPlanId,
      },
      payment_method: paymentMethodId,
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
      subscriptionPlanId,
      paymentIntent,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

  if(paymentIntent.status !== 'succeess') {
    const metada = paymentIntent?.metadata;
    const subscriptionPlanId = metada?.subscriptionPlanId;
    const userId = metada.userId;
    
    const userFound = await User.findById(userId);
    if(!userFound){
      return res.status(404).json({ message: 'User not found' });
    }

    const amount = paymentIntent?.amount / 100;
    const currency = paymentIntent?.currency;

    const newPayment = await Payment.create({
      user: userId,
      subscriptionPlan: subscriptionPlanId,
      status: 'success',
      amount,
      currency,
      reference: paymentId,
    });

    if(newPayment){
      userFound.hasSelectedPlan = true;
      userFound.plan = subscriptionPlanId;
      await userFound.save();
    }
    return res.status(201).json({
      message: 'Payment verified',
      status: true,
      userFound,
     });
  }
});

const freePayment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user){
    return res.status(404).json({ message: 'User not found' });
  }
  user.hasSelectedPlan = true;
  await user.save();
  res.json({ 
    message: 'Free plan activated',
    status: true,
  });
});

module.exports = { payment, verifyPayment, freePayment };