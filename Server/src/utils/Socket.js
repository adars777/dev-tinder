const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "https://dev-tinder-3cz6-g6ms6c6vd-adars777s-projects.vercel.app/", // ✅ your React app’s URL
      withCredentials: true,
    },
  });

  const getSecretRoomId = ({ userId, targetUserId }) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetUserId].sort().join("$"))
      .digest("hex");
  };

  io.on("connection", (socket) => {
    // handle events

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId({ userId, targetUserId });
      console.log(firstName + " joined room " + roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        const roomId = getSecretRoomId({ userId, targetUserId });
        console.log(firstName + " " + text);

        // save messages to the database.
        try {
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
            messages: [],
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          const savedMessage = chat.messages[chat.messages.length - 1];
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            createdAt: savedMessage.createdAt,
          });
        } catch (error) {
          console.error(
            `This error is coming while storing message in database: ${error}`
          );
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
