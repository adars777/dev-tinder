const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  
  if(!token){
    throw new ApiError("Unauthorized access!!", 401);
  }
  const decodedObj = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { _id } = decodedObj;

  const user = await User.findById(_id).select("-password");
  if (!user) {
    throw new ApiError("User not found!!");
  }
  req.user = user;
  next();
};

module.exports = { userAuth };
