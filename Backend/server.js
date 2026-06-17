import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://askgpt-mu.vercel.app"
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

// Connecting to DB and then start server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();