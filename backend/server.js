import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import vetRoutes from "./routes/vetRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js"; // ✅ ADD THIS
import appointmentRoutes from "./routes/appointmentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/vets", vetRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes); // ✅ ADD THIS
app.use("/api/appointments", appointmentRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);