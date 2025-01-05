const asyncHandler = require('express-async-handler');
const Plan = require('../models/plan/Plan.model');

const createPlan = asyncHandler (async (req, res) => {
  const { planName, features, price } = req.body;

  const planFound = await Plan.findOne({ planName });
  if (planFound) {
    return res.status(404).json({ message: 'Plan exist' });
  }

  const planCount = await Plan.countDocuments();
  if(planCount >= 2) {
    throw new Error('You can only create 2 plans');
  }

  const planCreated = await Plan.create({
    planName,
    user: req.user,
    features,
    price
  });
  res.status(200).json(planCreated);

});

const getPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find();
  res.status(200).json(plans);
});

const updatePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }
  const planUpdated = await Plan.findByIdAndUpdate(
    req.params.id,
    {
      planName: req.body.planName,
      features: req.body.features,
      price: req.body.price,

    },
    { 
      new: true 
    }
  );
  res.status(200).json(planUpdated);
});

const getPlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: 'plan not found' });
  }
  res.status(200).json(plan)
});

const deletePlan = asyncHandler (async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }
  await Plan.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Plan deleted' });
});

module.exports = { createPlan, getPlans, updatePlan, getPlan, deletePlan };