import express from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  res.json({
    message: "register route working",
  });
});

export default router;