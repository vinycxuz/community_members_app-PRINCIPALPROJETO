const express = require('express');
const earningsRouter = express.Router();

const earningsController = require('../controllers/earningsController');
const authVerification = require('../middleware/AuthVerification');

earningsRouter.get('/api/earnings', earningsController.getEarnings);
earningsRouter.get('/api/my-earnings', authVerification, earningsController.getUserEarnings);

module.exports = earningsRouter;