const express = require('express');
const router = express.Router();

const rouletteRouter = require('./roulette.routes');

router.use('/roulette', rouletteRouter);

module.exports = router;