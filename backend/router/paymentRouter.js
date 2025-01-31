const express = require('express');
const paymentRouter = express.Router();

const paymentController = require('../controllers/paymentController');
const authVerification = require('../middleware/AuthVerification');

paymentRouter.post('/api/payment/checkout', authVerification, paymentController.payment);

paymentRouter.get('/api/payment/verify/:paymentId', authVerification, paymentController.verifyPayment);

paymentRouter.get('/api/payment/free', authVerification, paymentController.freePayment);
module.exports = paymentRouter;