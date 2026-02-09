import mongoose from "mongoose";

const vetSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialization: String,
  experience: Number,
  city: String,
  status: { type: String, default: "pending" }
});

export default mongoose.model("Vet", vetSchema);
