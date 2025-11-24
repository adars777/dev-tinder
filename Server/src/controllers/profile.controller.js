const { AsyncHandler } = require("../utils/AsyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const User = require("../models/user.model");
const connectionRequestModel = require("../models/connectionRequest.model");

const receiveRequests = AsyncHandler(async (req, res) => {
  try {
    const loggedUser = await req.user;

    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName", "photoUrl"]);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          connectionRequest,
          "Connection Requests fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Error while fetching connection requests", error);
  }
});

const connections = AsyncHandler(async (req, res) => {
  // try {
  //   const loggedUser = await req.user;
  //   const connections = await connectionRequestModel
  //     .find({
  //       $or: [
  //         { toUserId: loggedUser._id, status: "accepted" },
  //         { fromUserId: loggedUser._id, status: "accepted" },
  //       ],
  //     })
  //     .populate("fromUserId", "firstName lastName photoUrl about skills age")
  //     .populate("toUserId", "firstName lastName photoUrl about skills age")

  //   if (!connections) {
  //     throw new ApiError("Connection Not Found!!");
  //   }

  //   const data = connections.map((row) => row.fromUserId);

  //   res
  //     .status(200)
  //     .json(new ApiResponse(200, "Connections fetched successfully!", data));
  // } catch (error) {
  //   throw new ApiError(
  //     500,
  //     "Getting Error while fetching the connections!!",
  //     error.message
  //   );
  // }

  try {
    const loggedInUser = await req.user;

    const connectionRequests = await connectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName photoUrl about skills age")
      .populate("toUserId", "firstName lastName photoUrl about skills age");

    // console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

const userFeed = AsyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skips = (page - 1) * limit;
    const loggedUser = await req.user;

    const allConnectionRequests = await connectionRequestModel
      .find({
        $or: [
          { fromUserId: loggedUser._id },
          {
            toUserId: loggedUser._id,
          },
        ],
      })
      .select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    allConnectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const feedUser = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedUser._id } },
      ],
    })
      .select("-createdAt -updatedAt")
      .skip(skips)
      .limit(limit);

    res
      .status(200)
      .json(new ApiResponse(200, feedUser, "feed data fetched successfully!"));
  } catch (error) {
    throw new ApiError(
      500,
      "getting error while fetching the user feed",
      error.message
    );
  }
});

module.exports = {
  receiveRequests,
  connections,
  userFeed
};
