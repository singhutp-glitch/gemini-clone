import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import chatRoutes from "./src/routes/chatRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", chatRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});