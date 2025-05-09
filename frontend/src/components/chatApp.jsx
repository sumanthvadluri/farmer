// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import "../styles.css"; // Add appropriate CSS for styling

// const socket = io("http://localhost:5000");

// const ChatApp = ({ onClose, username }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     socket.on("loadMessages", (prevMessages) => {
//       setMessages(prevMessages);
//     });

//     socket.on("receiveMessage", (newMessage) => {
//       setMessages((prev) => [...prev, newMessage]);
//     });

//     return () => {
//       socket.off("loadMessages");
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", { sender: username, message });
//       setMessage("");
//     }
//   };

//   return (
//     <div className="chat-modal">
//       <div className="chat-header">
//         <h2>Chat</h2>
//         <button className="close-btn" onClick={onClose}>×</button>
//       </div>
//       <div className="chat-body">
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <strong>{msg.sender}: </strong>
//             {msg.message}
//           </p>
//         ))}
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;
