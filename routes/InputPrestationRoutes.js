import express from "express";
import { createInputPrestation } from "../Controllers/InputPrestationController.js";

const router = express.Router();

router.post("/", createInputPrestation);


export default router;
