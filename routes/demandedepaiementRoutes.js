import express from "express";
import { createDemandePaiement } from "../Controllers/demandedepaiementController.js";


const router = express.Router();

router.post("/", createDemandePaiement);


export default router;
