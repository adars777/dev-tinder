const mongoose = require("mongoose");
const { Schema } = mongoose;
const ApiError = require("../utils/ApiError");

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} in incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;

  // check if fromUserId is equal to toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new ApiError("cannot send the connection request to yourself!!");
  }
});

const connectionRequestModel = mongoose.model(
  "connectionRequestModel",
  connectionRequestSchema
);

module.exports = connectionRequestModel;
