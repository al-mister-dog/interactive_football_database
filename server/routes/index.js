const express = require("express");
const router = express.Router();

const authenticationRoutes = require("./authentication");
const tableRoutes = require("./table");
const socialRoutes = require("./social");
const imageRoutes = require("./images")
const userRoutes = require("./user")
const searchbarRoutes = require('./searchbar')
const leagueRoutes = require('./leagues')

router.use("/auth", authenticationRoutes);
router.use("/table", tableRoutes);
router.use("/social", socialRoutes);
router.use("/images", imageRoutes)
router.use("/users", userRoutes);
router.use("/search", searchbarRoutes);
router.use("/leagues", leagueRoutes);
router.use("/test", (req, res) => {
  res.send({success: true})
})

module.exports = router;
