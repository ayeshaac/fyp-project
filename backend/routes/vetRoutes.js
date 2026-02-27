import express from "express";
import Vet from "../models/Vet.js";
import {
  registerVet,
  getVets,
  getPendingVets,
  approveVet,
  rejectVet,
  loginVet
} from "../controllers/vetController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   🔹 PUBLIC ROUTES
========================= */

// Signup
router.post("/", registerVet);

// Login
router.post("/login", loginVet);

// Get approved vets (public page)
router.get("/", getVets);


/* =========================
   🔹 ADMIN ROUTES
========================= */

// Get pending vets
router.get("/pending", getPendingVets);

// Approve vet
router.put("/:id/approve", approveVet);

// Reject vet
router.put("/:id/reject", rejectVet);


/* =========================
   🔐 PROTECTED ROUTES
========================= */

// Get logged-in vet FULL profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const vet = await Vet.findById(req.user.id).select("-password");

    if (!vet) {
      return res.status(404).json({ message: "Vet not found" });
    }

    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;