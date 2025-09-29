const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      require: true,
      type: String,
      index: true,
    },
    lastName: {
      require: true,
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    skills: { 
      type: [String],
    },
    about: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "others"],
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
