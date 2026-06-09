import express from "express";
import cors from "cors";

import chatRoutes from "./src/routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", chatRoutes);

app.listen(3000, () => {
  console.log("Server running on port 5000");
});