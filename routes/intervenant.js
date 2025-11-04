import express from "express";
import {
  createIntervenant,
  getAllIntervenants,
  getIntervenantById,
  updateIntervenant,
  deleteIntervenant,
} from "../Controllers/intervenantController.js";

const router = express.Router();

router.post("/", createIntervenant);
router.get("/", getAllIntervenants);
router.get("/:id", getIntervenantById);
router.put("/:id", updateIntervenant);
router.delete("/:id", deleteIntervenant);

export default router;
