// import express from "express";
// import cookieParser from "cookie-parser";
// import dotenv  from "dotenv";
// import cors from "cors";
// import predictRoutes from "./routes/predictRoutes.js";
// //import path from "path";
// import userRoutes from "./routes/userRoutes.js";
// import farmerCropRoutes from "./routes/farmerCropRoutes.js";
// import connectDB from "./config/db.js";
// dotenv.config();
// connectDB();


// const app= express();

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true}));
// app.use(cookieParser());
// app.use("/api/v1/predict", predictRoutes);

// const PORT= process.env.PORT || 5000;

// app.use("/api/v1/users",userRoutes);
// app.use("/api/farmercrops", farmerCropRoutes);

// app.listen(PORT, ()=>console.log(`server is running successfully on port ${PORT}`));


// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import predictRoutes from "./routes/predictRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import farmerCropRoutes from "./routes/farmerCropRoutes.js";
// import chatRoutes from "./routes/chatroutes.js";
// import Chat from "./models/Chat.js";

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);

// // CORS Configuration - Allow both Vite (5173) and CRA (3000)
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:3000"],
//   credentials: true,
// }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // API Routes
// app.use("/api/v1/predict", predictRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/farmercrops", farmerCropRoutes);
// app.use("/api/chats", chatRoutes);

// // Socket.io Connection
// io.on("connection", (socket) => {
//   console.log("New user connected:", socket.id);

//   socket.on("sendMessage", async ({ senderId, senderName, message }) => {
//     try {
//       const newMessage = new Chat({ senderId, senderName, message });
//       await newMessage.save();
//       io.emit("receiveMessage", newMessage); // Broadcast message to all clients
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // Check MongoDB Connection
// connectDB()
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import predictRoutes from "./routes/predictRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import farmerCropRoutes from "./routes/farmerCropRoutes.js";
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// import Chat from "./models/Chat.js";

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);

// // CORS Configuration - Allow both Vite (5173) and CRA (3000)
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:3000"],
//     credentials: true,
//   })
// );
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // API Routes
// app.use("/api/v1/predict", predictRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/farmercrops", farmerCropRoutes);
// app.use("/api/chats", chatRoutes);

// // Socket.io Connection
// io.on("connection", (socket) => {
//   console.log("New user connected:", socket.id);

//   socket.on("joinRoom", ({ farmerId, buyerId }) => {
//     const roomId = farmerId + "-" + buyerId;
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);
//   });

//   socket.on("sendMessage", async ({ farmerId, buyerId, senderId, message }) => {
//     try {
//       const newMessage = new Chat({ farmerId, buyerId, senderId, message });
//       await newMessage.save();
//       const roomId = farmerId + "-" + buyerId;
//       io.to(roomId).emit("receiveMessage", newMessage); // Send to specific room
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // Check MongoDB Connection
// connectDB()
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
// import cropPredictRoutes from "./routes/cropPredictRoutes.js";
import farmerCropRoutes from "./routes/farmerCropRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const __dirname1 = path.resolve();

// Middleware
app.use(express.json()); // Accept JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // Allow both Vite & React Dev Server
  credentials: true,
}));

// API Routes
// app.use("/api/v1/predict", predictRoutes);
// app.use("/api/v1/croppredict", cropPredictRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/farmercrops", farmerCropRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
let  latestMoisture=0;
app.post('/api/soil', (req, res) => {
  const { moisture } = req.body;
  latestMoisture = moisture;
  console.log("Received moisture:", moisture);
  res.sendStatus(200);
});

app.get('/api/soil', (req, res) => {
  res.json({ moisture: latestMoisture });
});

// Deployment Setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on PORT ${PORT}...`)
);

// Socket.io Configuration
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow both Vite & React Dev Server
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ New user connected:", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("👤 User joined room:", room);
  });

  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat.users) {
      console.log("❌ Chat users not defined");
      return;
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.to(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});
