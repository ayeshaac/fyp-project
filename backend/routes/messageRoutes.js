import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// send message
router.post("/", async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    res.json(msg);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get messages
router.get("/:appointmentId", async (req, res) => {
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