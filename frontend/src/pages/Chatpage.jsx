import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "../styles.css";

const socket = io("http://localhost:5000");

const ChatApp = () => {
  const [contacts, setContacts] = useState([
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" }
  ]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messagesMap, setMessagesMap] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const userId = "0"; // Replace with logged-in user ID

  const messagesEndRef = useRef(null); // ✅ Ref for scrolling to bottom

  // ✅ Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesMap[currentChat?.id]]); // Trigger only when messages update

  // ✅ Listen for incoming messages
  useEffect(() => {
    const messageListener = (message) => {
      if (message.senderId === currentChat?.id || message.receiverId === currentChat?.id) {
        setMessagesMap((prev) => ({
          ...prev,
          [currentChat.id]: [...(prev[currentChat.id] || []), message]
        }));
      }
    };

    socket.on("message", messageListener);
    return () => socket.off("message", messageListener);
  }, [currentChat]);

  // ✅ Fetch messages when a new contact is selected
  useEffect(() => {
    if (currentChat && !messagesMap[currentChat.id]) {
      axios
        .get(`http://localhost:5000/messages/${userId}/${currentChat.id}`)
        .then((response) => {
          setMessagesMap((prev) => ({
            ...prev,
            [currentChat.id]: response.data
          }));
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [currentChat]);

  // ✅ Send message and update local state
  const sendMessage = () => {
    if (newMessage.trim() === "" || !currentChat) return;
    
    const messageData = {
      senderId: userId,
      receiverId: currentChat.id,
      text: newMessage
    };

    socket.emit("sendMessage", messageData);

    setMessagesMap((prev) => ({
      ...prev,
      [currentChat.id]: [...(prev[currentChat.id] || []), messageData]
    }));

    setNewMessage("");

    axios.post("http://localhost:5000/messages", messageData)
      .catch((error) => console.error("Error saving message:", error));
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>Chats</h2>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact ${currentChat?.id === contact.id ? "active" : ""}`}
            onClick={() => setCurrentChat(contact)}
          >
            {contact.name}
          </div>
        ))}
      </div>
      <div className="chat-box">
        {currentChat ? (
          <>
            <div className="chat-header">{currentChat.name}</div>
            <div className="messages">
              {(messagesMap[currentChat.id] || []).map((msg, index) => (
                <div key={index} className={msg.senderId === userId ? "my-message" : "their-message"}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* ✅ Scrolls to this element */}
            </div>
            <div className="input-box">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
