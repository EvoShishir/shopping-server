const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");
const router = express.Router();

router.route("/create-user").post(createUser);
router.route("/get-users").get(getUsers);

module.exports = router;
