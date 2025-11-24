const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const { fetchChats } = require("../controllers/chat.controller");

router.route("/fetchchat/:targetUserId").get(userAuth, fetchChats);

module.exports = router;
