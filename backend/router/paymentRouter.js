const express = require('express');
const paymentRouter = express.Router();

const paymentController = require('../controllers/paymentController');
const authVerification = require('../middleware/AuthVerification');

paymentRouter.post('/api/payment/checkout', authVerification, paymentController.payment);

paymentRouter.get('/api/payment/checkout/:paymentId', authVerification, paymentController.verifyPayment);

module.exports = paymentRouter;