const express = require('express')
const router = express.Router()
const leagues = require('../controllers/leagues')

router.get('/premier-league', leagues.getPrem);
router.get('/bundesliga', leagues.getBundesliga);
router.get('/serie-a', leagues.getSerieA);
router.get('/la-liga', leagues.getLaLiga);
router.get('/ligue-1', leagues.getLigue1);

module.exports = router

