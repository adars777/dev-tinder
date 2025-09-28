const express = require("express");
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const app = express();

// /middlewaers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v2/users", userRouter);

module.exports = { app };
