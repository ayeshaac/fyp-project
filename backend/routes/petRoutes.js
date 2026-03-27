import express from "express";

import {
  addPet,
  getMyPets,
  deletePet,
  updatePet // ✅ ADD THIS
} from "../controllers/petController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addPet);
router.get("/my", verifyToken, getMyPets);
router.delete("/:id", verifyToken, deletePet);

// ✅ NEW ROUTE
router.put("/:id", verifyToken, updatePet);

export default router;