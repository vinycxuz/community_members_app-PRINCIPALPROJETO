const express = require('express');
const planRouter = express.Router();

const planController = require('../controllers/planController');
const authVerification = require('../middleware/AuthVerification');
const checkUserPlan = require('../middleware/checkUserPlan');

planRouter.post('/api/plan/create', authVerification, checkUserPlan, planController.createPlan);

planRouter.get('/api/plan', planController.getPlans);

planRouter.put('/api/plan/update/:id', authVerification, planController.updatePlan);

planRouter.get('/api/plan/:id', planController.getPlan);

planRouter.delete('/api/plan/delete/:id', authVerification, planController.deletePlan);

module.exports = planRouter;