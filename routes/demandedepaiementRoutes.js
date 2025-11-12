import express from "express";
import { createDemandePaiement } from "../Controllers/demandedepaiementController.js";
import { rechercherPaiements } from "../Controllers/demandedepaiementController.js";
import { interrogerPaiements } from "../Controllers/demandedepaiementController.js";
import { recupererListeFacturePeriode } from "../Controllers/demandedepaiementController.js";
import { envoyerVersUrssaf } from "../Controllers/demandedepaiementController.js";
import { updateDemandePaiement  } from "../Controllers/demandedepaiementController.js";
import { interrogerViaBackend  } from "../Controllers/demandedepaiementController.js";
import { upsertDemandePaiement  } from "../Controllers/demandedepaiementController.js";
const router = express.Router();

router.post("/", createDemandePaiement);
router.put("/update/:id", updateDemandePaiement);
router.post("/upsert", upsertDemandePaiement);
router.post("/recherche", rechercherPaiements);
router.post("/interrogation", interrogerPaiements);
router.post("/periode", recupererListeFacturePeriode);
router.post("/envoyer", envoyerVersUrssaf);
router.post("/interrogerUrssaf", interrogerViaBackend);


export default router;
