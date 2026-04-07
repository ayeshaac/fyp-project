import express from "express";
import Message from "../models/Message.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ SEND MESSAGE (SIMPLE)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { appointmentId, text } = req.body;

    const sender = req.user.role;

    const msg = await Message.create({
      appointmentId,
      text,
      sender,
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ GET MESSAGES
router.get("/:appointmentId", verifyToken, async (req, res) => {
  try {
    const msgs = await Message.find({
      appointmentId: req.params.appointmentId,
    }).sort({ createdAt: 1 });

    res.json(msgs);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;