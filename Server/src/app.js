const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./routes/user.routes");
const connectionRouter = require("./routes/connectionRequest.routes");

// /middlewaers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v2/users", userRouter);
app.use("/api/v2/connections", connectionRouter);

module.exports = { app };
