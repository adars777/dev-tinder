const mongoose = require("mongoose");
const { DB_NAME } = require("../constant");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Connected to MONGODB!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {    
    console.log("MONGODB CONNECTION FAOILED!!", error);
    process.exit(1);
  }
};

module.exports = connectDB;
