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
        values: ["male", "female", "others"],
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1629067441737-0c22914c68b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxwcm9maWxlJTIwaWNvbnxlbnwwfDJ8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600",
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
