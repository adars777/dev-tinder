const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRouter = require("./routes/user.routes");
const connectionRouter = require("./routes/connectionRequest.routes");
const profileRouter = require("./routes/profile.route");
const cors = require("cors");
const chatRouter = require("./routes/chat.route");

// /middlewaers

app.use(express.json({ limit: "16kb" }));
// app.use(
//   cors({
//     origin: "https://dev-tinder-frontend-qkn9.onrender.com", // ✅ your React app’s URL
//     credentials: true, // if you use cookies or auth headers
//   })
// );


app.set("trust proxy", 1); // REQUIRED for Render

app.use(
  cors({

    origin: "https://dev-tinder-client.onrender.com",
    credentials: true
  })
);


app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());



app.use("/api/v2/users", userRouter);
app.use("/api/v2/connections", connectionRouter);
app.use("/api/v2/profile", profileRouter);
app.use("/api/v2/chat", chatRouter);


module.exports = { app };
