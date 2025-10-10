const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const {
  loginUser,
  registerUser,
  userProfile,
  logout,
  editProfile,

  changeCurrentPassword,
  deleteUser,
} = require("../controllers/user.controller");
const { register } = require("module");

// const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").get(userAuth, userProfile);

router.route("/logout").post(userAuth, logout);

router.route("/profile/edit").patch(userAuth, editProfile);

router.route("/profile/edit-password").patch(userAuth, changeCurrentPassword);

router.route("/delete").delete(userAuth, deleteUser);

module.exports = router;
