const { AsyncHandler } = require("../utils/AsyncHandler");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user.model");
const { ApiResponse } = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationProfileEditData } = require("../utils/validation");
const { validPasswordEditData } = require("../utils/validation");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");

const registerUser = AsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    skills,
    about,
    gender,
    password,
    age,
  } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.send("User Already Registered!!");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender,
      age,
      password: passwordHash,
      about,
      skills,
    });
    await newUser.save();

    const createdUser = await User.findById(newUser._id).select("-password");

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully!"));
  } catch (error) {
    throw new ApiError(500, "Error while register new user", error);
  }
});

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email);

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new ApiError(404, "Invalid Credentials!!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const token = await jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY
      );

      const loggedInUser = await User.findById(user._id).select("-password");
      res.cookie("token", token);
      return res
        .status(200)
        .json(
          new ApiResponse(200, loggedInUser, "Logged In User Successfully!!")
        );
    } else {
      throw new ApiError(404, "Invalid Credentials!");
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Error while login the user!", error.message);
  }
};

const userProfile = AsyncHandler(async (req, res) => {
  try {
    const user = await req.user;

    // console.log(user);
    // res.send(user)
    return res
      .status(200)
      .json(new ApiResponse(200, user, "user fetched successfully"));
  } catch (error) {
    throw new ApiError(401, "Error while fetching user profile", error);
  }
});

const logout = AsyncHandler(async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "Logged Out Successfully.."));
  } catch (error) {
    throw new ApiError(500, "Getting error while logout the user.");
  }
});

const editProfile = AsyncHandler(async (req, res) => {
  try {
    if (!validationProfileEditData(req)) {
      throw new ApiError(400, "Invalid Edit Field!!");
    }

    const loggedUser = await req.user;
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));

    await loggedUser.save();
    return res
      .status(200)
      .json(new ApiResponse(200, loggedUser, "Profile Updated Successfully.."));
  } catch (error) {
    throw new ApiError(
      400,
      "Getting error while updating the profile",
      error.message
    );
  }
});

const updateProfile = AsyncHandler(async (req, res) => {
  try {
    const user = await req.user; // logged-in user
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    console.log(req.file);
    
    if (!req.file) return res.status(400).json({ message: "File missing" });

    // cloudinary upload helper using buffer
    const upload = () =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "avatars" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

    const result = await upload();
    console.log(result);
    

    // Save URL to DB
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { photoUrl: result.secure_url },
      { new: true }
    );

    return res.json({
      message: "Avatar uploaded successfully",
      avatar: updatedUser.avatar,
      user: updatedUser
    });

  }  catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

const changeCurrentPassword = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid OldPassword!");
  }
  const passwordHash = await bcrypt.hash(newPassword, 10);

  user.password = passwordHash;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully!"));
});

const deleteUser = AsyncHandler(async (req, res) => {
  try {
    const id = await req.user._id;
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      throw new ApiError("User not found!!!");
    }
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "User deleted Successfully..."));
  } catch (error) {
    throw new ApiError(500, "Getting error while deleting the user...");
  }
});

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  logout,
  editProfile,
  deleteUser,
  changeCurrentPassword,
  updateProfile,
};
