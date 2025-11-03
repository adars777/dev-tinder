const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./routes/user.routes");
const connectionRouter = require("./routes/connectionRequest.routes");
const profileRouter = require("./routes/profile.route");
const cors = require("cors");

// /middlewaers

app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your React app’s URL
    credentials: true, // if you use cookies or auth headers
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


app.use("/api/v2/users", userRouter);
app.use("/api/v2/connections", connectionRouter);
app.use("/api/v2/profile", profileRouter);

module.exports = { app };
