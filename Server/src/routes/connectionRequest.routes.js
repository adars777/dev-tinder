const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/userAuth");

const {
  sendResponse,
  reviewRequest,
} = require("../controllers/connectionReqeust.controller");

router.route("/request/send/:status/:toUserId").post(userAuth, sendResponse);
router.route("/request/review/:status/:requestId").post(userAuth, reviewRequest);


module.exports = router;