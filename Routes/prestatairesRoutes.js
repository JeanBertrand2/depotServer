import express from "express";
import {
  createPrestataire,
  updatePrestataire,
  checkPrestataireExistence,
  getPrestataireById
} from "../Controllers/prestatairesController.js";

const router = express.Router();

export default (pool) => {
  router.get("/existe", (req, res) => checkPrestataireExistence(pool, req, res));
  router.get("/:id", (req, res) => getPrestataireById(pool, req, res)); 
  router.post("/", (req, res) => createPrestataire(pool, req, res));
  router.put("/", (req, res) => updatePrestataire(pool, req, res));
  return router;
};
