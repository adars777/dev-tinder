const mongoose = require("mongoose");
const { Schema } = mongoose;
const ApiError = require("../utils/ApiError");

const connectionRequestSchema = new Schema(
  {
    fromuserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      require: true,
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
  if (connectionRequest.fromuserId.equals(connectionRequest.toUserId)) {
    throw new ApiError("cannot send the connection request to yourself!!");
  }
});

const connectionRequestModel = new mongoose.model(
  "connectionRequestModel",
  connectionRequestSchema
);

model.exports = connectionRequestModel;
