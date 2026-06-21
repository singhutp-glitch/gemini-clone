import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import chatRoutes from "./src/routes/chatRoutes.js";
import authRoutes from './src/routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chats", chatRoutes);
app.use("/auth", authRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port "+PORT);
});