const express = require("express");
const session = require("express-session");
const router = express.Router();
const {
  createUser,
  getUsers,
  loginUser,
  getMyProfile,
  updateMyProfile,
  logoutUser,
  updateUserRole,
} = require("../controllers/userController");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.use(
  session({
    secret: process.env.JWT_PRIVATE_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

router.route("/me").get(auth, getMyProfile);
router.route("/update-role/:id").put([auth, admin], updateUserRole);
router.route("/update-me").put(auth, updateMyProfile);
router.route("/create-user").post(createUser);
router.route("/get-users").get([auth, admin], getUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(auth, logoutUser);

module.exports = router;
