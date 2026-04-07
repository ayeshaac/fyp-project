import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  sender: String, // "user" ya "vet"
  text: String,
   
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", messageSchema);