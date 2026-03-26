import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    type: String,
    breed: String,
    age: String,
    gender: String,
    weight: String,
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);