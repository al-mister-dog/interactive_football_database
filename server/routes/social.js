const express = require("express");
const router = express.Router();

const followsController = require("../controllers/follows");
const bookmarksController = require("../controllers/bookmarks");
const favouriteTeamsController = require("../controllers/favouriteTeams");
const interestsController = require("../controllers/interests");

router.post("/follow", followsController.follow);
router.post("/unfollow", followsController.unfollow);
router.get("/get-followers", followsController.getFollowers);
router.get("/get-user-followers", followsController.getUserFollowers);

router.post("/bookmark", bookmarksController.bookmark);
router.get("/get-bookmarks", bookmarksController.getBookmarks);
router.get("/get-user-bookmarks", bookmarksController.getUserBookmarks);
router.get("/check-bookmark", bookmarksController.checkBookmark);
router.delete("/bookmark", bookmarksController.deleteBookmark);
router.delete("/unbookmark", bookmarksController.unbookmark);

router.get("/favourite-teams", favouriteTeamsController.getFavouriteTeams);
router.post("/favourite-teams", favouriteTeamsController.saveFavouriteTeams);

router.get("/interests", interestsController.getInterests);
router.post("/interests", interestsController.addInterests);

module.exports = router;
