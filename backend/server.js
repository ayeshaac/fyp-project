import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import vetRoutes from "./routes/vetRoutes.js";

// 🔹 Load .env variables
dotenv.config();

// 🔹 Connect MongoDB
connectDB();

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 🔹 Vet routes
app.use("/api/vets", vetRoutes);

// 🔹 Port
const PORT = process.env.PORT || 5000;

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
