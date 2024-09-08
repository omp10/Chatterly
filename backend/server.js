import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import connectToMongo from "../backend/db/connectToMongo.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { server, app } from "./socket/socket.js"; // Correct import

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
server.listen(PORT, () => {
  connectToMongo();
  console.log(`Server started at: http://localhost:${PORT}/`);
});
