import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/Socket";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?.data?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get("/api/v2/chat/fetchchat/" + targetUserId, {
      withCredentials: true,
    });

    // console.log(chat);

    const chatMessages =
      chat?.data?.data?.flatMap((chatItem) =>
        chatItem.messages.map((msg) => ({
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg.text,
          createdAt: msg.createdAt,
        }))
      ) || [];

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  // UseRef for single socket instance
  // console.log("this is the target user id" + targetUserId);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.data.firstName,
      userId,
      targetUserId,
    });
    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    // Use the existing socket instance
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.data.firstName,
      lastName: user.data.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mt-20 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          // console.log(msg);
          const getDate = new Date(msg.createdAt);
          // console.log(getDate);
          // const date = getDate.toISOString().split("T")[0]; //
          const time = getDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
          // console.log(date);

          const isMe = user?.data?.firstName === msg.firstName;

          return (
            <div
              key={index}
              className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-xs p-3 rounded-lg`}>
                <div className="text-xs">
                  {msg.firstName} {msg.lastName}
                  {"  "}
                </div>

                <div
                  className={`flex px-2 rounded-xl ${
                    isMe ? "bg-blue-700 rounded-br-none chat chat-start" : "bg-slate-700 rounded-bl-none chat chat-end"
                  }`}
                >
                  {msg.text}
                </div>

                <div className="text-[10px] opacity-70 text-right">
                  {time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          placeholder="Enter text here..."
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button
          type="submit"
          
          onClick={sendMessage}
          className="btn btn-secondary"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
