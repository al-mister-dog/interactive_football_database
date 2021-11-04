const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/get-user-tables", usersController.getUserTables);
router.get("/user-table-info", usersController.getUserTableInfo);
router.post("/save-user-table", usersController.saveUserTable);
router.get("/get-username", usersController.getUsername);
router.get("/get-users", usersController.getUsers);
router.get("/get-single-user", usersController.getUser);
router.get("/profile-pic", usersController.getProfilePic);
router.delete("/delete-table", usersController.deleteTable);

module.exports = router;
