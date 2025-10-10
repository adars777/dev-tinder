const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const {
  receiveRequests,
  connections,
  userFeed,
} = require("../controllers/profile.controller");

router.route("/requests/received").get(userAuth, receiveRequests);

router.route("/connections").get(userAuth, connections);
router.route("/feed").get(userAuth, userFeed);

module.exports = router;
