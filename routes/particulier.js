import express from "express";
import { createParticulier } from "../Controllers/particulierController.js";

const router = express.Router();

router.post("/", createParticulier);

export default router;
