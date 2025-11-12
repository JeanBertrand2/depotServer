import express from "express";
import {
  createParticulier,
  getParticulier,
} from "../Controllers/particulierController.js";

const router = express.Router();

router.post("/", createParticulier);
router.get("/", getParticulier);
export default router;
