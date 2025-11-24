const { ApiError } = require("../utils/ApiError");
const { AsyncHandler } = require("../utils/AsyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { Chat } = require("../models/chat");

const fetchChats = AsyncHandler(async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.find({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res
      .status(200)
      .json(new ApiResponse(200, chat, "chat data fetched successfully!"));
  } catch (error) {
    throw new ApiError(500, "Error is coming while fetching chats:", error);
  }
});

module.exports = { fetchChats };
