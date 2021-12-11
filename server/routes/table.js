//THIS NEEDS TIDYING UP
const express = require("express");
const router = express.Router();

const teamsController = require("../controllers/teams");
const tableController = require("../controllers/table");
const statsController = require("../controllers/stats");

router.get("/get-teams/:id", teamsController.getTeams);
router.get("/get-team-page-data/:id", teamsController.getTeamPageData);
router.get("/get-all-teams", teamsController.getAllTeams);
router.get("/get-team/:id", teamsController.getTeam);
router.get("/get-data", tableController.getData);
router.get("/filter", tableController.filter);
router.get("/sort", tableController.sort);
router.get("/sort-filtered", tableController.sortFiltered);
router.get("/get-random-url", tableController.getRandomUrl);
router.get("/get-prepared-stat", statsController.getStats);
router.get("/team-logo", teamsController.getTeamLogo);

module.exports = router;
