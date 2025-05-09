import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "../styles.css";

const socket = io("http://localhost:5000");

const ChatApp = () => {
  const { farmerId, buyerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Join chat room
    socket.emit("joinChat", { userId: buyerId });

    // Fetch chat history
    axios.get(`http://localhost:5000/api/chats/${farmerId}/${buyerId}`)
      .then(response => setMessages(response.data))
      .catch(error => console.error("Error fetching messages:", error));

    // Receive new messages in real-time
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [farmerId, buyerId]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("sendMessage", { farmerId, buyerId, senderId: buyerId, message: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with Farmer</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === buyerId ? "buyer" : "farmer"}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
