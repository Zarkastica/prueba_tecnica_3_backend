const express = require('express');
const router = express.Router();
const {createRoulette, getRoulettes, openRoulette, betRoulette, closeRoulette} = require('../controllers/roulette.controller');


router.post('/create', createRoulette);
router.get('/get', getRoulettes);
router.put('/open/:id', openRoulette);
router.put('/bet/:id', betRoulette);
router.put('/cerrar/:id', closeRoulette);

module.exports = router;