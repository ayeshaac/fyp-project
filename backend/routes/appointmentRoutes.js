import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getVetAppointments,
} from "../controllers/appointmentController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ create appointment
router.post("/", verifyToken, createAppointment);

// 👤 user appointments
router.get("/my", verifyToken, getMyAppointments);

// 👨‍⚕️ vet appointments
router.get("/vet", verifyToken, getVetAppointments);

export default router;