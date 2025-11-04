import express from "express";
import { createDemandePaiement } from "../Controllers/demandedepaiementController.js";
import { rechercherPaiements } from "../Controllers/demandedepaiementController.js";

const router = express.Router();

router.post("/", createDemandePaiement);
router.post("/recherche", rechercherPaiements);

export default router;
