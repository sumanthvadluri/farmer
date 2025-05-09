// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { getSender } from "../config/ChatLogics";
// import ChatLoading from "../ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { useChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const { selectedChat, setSelectedChat, user, chats, setChats } = useChatState();

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${user.token}` },
//       };

//       const { data } = await axios.get("/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       alert("Error Occurred! Failed to Load the chats.");
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//   }, [fetchAgain]);

//   return (
//     <div style={styles.chatContainer}>
//       <div style={styles.header}>
//         <h2>My Chats</h2>
//         <GroupChatModal>
//           <button style={styles.button}>New Group Chat</button>
//         </GroupChatModal>
//       </div>
//       <div style={styles.chatList}>
//         {chats ? (
//           <div style={styles.scrollContainer}>
//             {chats.map((chat) => (
//               <div
//                 key={chat._id}
//                 onClick={() => setSelectedChat(chat)}
//                 style={{
//                   ...styles.chatItem,
//                   backgroundColor: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
//                   color: selectedChat === chat ? "white" : "black",
//                 }}
//               >
//                 <p>
//                   {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
//                 </p>
//                 {chat.latestMessage && (
//                   <p style={styles.latestMessage}>
//                     <b>{chat.latestMessage.sender.name}:</b>{" "}
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <ChatLoading />
//         )}
//       </div>
//     </div>
//   );
// };

// // ✅ Simple CSS-in-JS Styles
// const styles = {
//   chatContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "10px",
//     backgroundColor: "white",
//     width: "30%",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     width: "100%",
//     alignItems: "center",
//     paddingBottom: "10px",
//   },
//   button: {
//     padding: "8px 12px",
//     fontSize: "14px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   chatList: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "10px",
//     width: "100%",
//     height: "100%",
//     borderRadius: "8px",
//     backgroundColor: "#F8F8F8",
//     overflowY: "hidden",
//   },
//   scrollContainer: {
//     overflowY: "auto",
//     maxHeight: "400px",
//   },
//   chatItem: {
//     cursor: "pointer",
//     padding: "10px",
//     borderRadius: "8px",
//     marginBottom: "5px",
//   },
//   latestMessage: {
//     fontSize: "12px",
//     color: "#555",
//   },
// };

// export default MyChats;
