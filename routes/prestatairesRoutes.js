import express from "express";
import {
  createPrestataire,
  updatePrestataire,
  checkPrestataireExistence,
  getPrestataireById,
  getUrssafParams,
} from "../Controllers/prestatairesController.js";

const router = express.Router();

//  Créer un prestataire
router.post("/", createPrestataire);
//Récuperation url/token
router.get("/urssaf", getUrssafParams);
//  Modifier un prestataire
router.put("/", updatePrestataire);

// Vérifier s’il existe au moins un prestataire
router.get("/check", checkPrestataireExistence);


// Récupérer un prestataire par ID
router.get("/:id", getPrestataireById);


// Récupération url/token

export default router;
