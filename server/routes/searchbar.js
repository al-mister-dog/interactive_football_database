const express = require("express");
const router = express.Router();

const searchbarController = require("../controllers/searchbar");

router.get('/players', searchbarController.searchPlayers);
router.get('/teams', searchbarController.searchTeams);
router.get('/users', searchbarController.searchUsers);

module.exports = router