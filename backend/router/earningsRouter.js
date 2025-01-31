const express = require('express');
const earningsRouter = express.Router();

const earningsController = require('../controllers/earningsController');

earningsRouter.get('/api/earnings', earningsController.getEarnings);

module.exports = earningsRouter;