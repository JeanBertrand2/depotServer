import express from "express";
import { getAllDonneesBaseCombo } from "../Controller/DonneeBaseComboController.js";

const router = express.Router();

router.get("/", getAllDonneesBaseCombo);

export default router;
