const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  loginUser,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.route("/me").get(auth, getMyProfile);
router.route("/update-me").put(auth, updateMyProfile);
router.route("/create-user").post(createUser);
router.route("/get-users").get([auth, admin], getUsers);
router.route("/login").post(loginUser);

module.exports = router;
