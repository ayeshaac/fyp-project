import express from "express";
import {
  registerVet,
  getVets,
  getPendingVets,
  approveVet,
  rejectVet
} from "../controllers/vetController.js";

const router = express.Router();

// Public
router.post("/", registerVet);
router.get("/", getVets);

// Admin
router.get("/pending", getPendingVets);
router.put("/:id/approve", approveVet);
router.put("/:id/reject", rejectVet);

export default router;
