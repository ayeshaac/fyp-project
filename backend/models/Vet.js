import mongoose from "mongoose";

const vetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  experience: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    default: "vet"
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

const Vet = mongoose.model("Vet", vetSchema);

export default Vet;