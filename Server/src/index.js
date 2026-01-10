const dotenv = require("dotenv");
const connectDB = require("./db/index");
const { app } = require("./app");
const http = require("http");
const initializeSocket = require("./utils/Socket");

dotenv.config({
  path: "../.env",
});

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    server.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    server.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGODB CONNECTION FAILED!!: ${error}`);
  });
