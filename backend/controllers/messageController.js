import Message from "../models/Message.js";

// ✅ SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { appointmentId, text } = req.body;

    // 🔥 sender auto set from JWT
    const sender = req.user.role; // "user" ya "vet"

    const message = new Message({
      appointmentId,
      sender,
      text,
    });

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET MESSAGES
export const getMessages = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const messages = await Message.find({ appointmentId }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};