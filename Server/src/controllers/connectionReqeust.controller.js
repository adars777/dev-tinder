const { ApiError } = require("../utils/ApiError");
const { AsyncHandler } = require("../utils/AsyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const connectionRequest = require("../models/connectionRequest.model");

const sendResponse = AsyncHandler(async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json(new ApiResponse(400, `Invalid Status type ${status}`));
    }

    // if there is any existing connection request
    const existingConnectionRequest = await connectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId, fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .json(new ApiResponse(400, "CONNECTION REQUEST ALREADY EXIST!!"));
    }

    const data = await connectionRequest.save();
    const fromUser = await User.findById(fromUserId).select("firstName");
    const toUser = await User.findById(toUserId).select("firstName");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          `${fromUser.firstName} is ${status} in ${toUser.firstName}`
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      "Getting error while sending the request to person.",
      error
    );
  }
});

const reviewRequest = AsyncHandler(async (req, res) => {
  try {
    const loggedUser = await req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json(new ApiResponse(400, "Status not found!!"));
    }

    const connectionRequest = await connectionRequest.findOne({
      _id: requestId,
      toUserId: loggedUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json(404, "Connection Request Not Found!");
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    return res
      .status(100)
      .json(new ApiResponse(100, `Connection Request: ${status}`, data));
  } catch (error) {
    throw new ApiError(
      500,
      "Getting error while sending the response to getting requests ",
      error.message
    );
  }
});

module.exports = { sendResponse, reviewRequest };
