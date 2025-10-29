import express from "express";
import { getAllPays, createPays } from "../Controllers/paysController.js";

const router = express.Router();

export default (pool) => {
  router.get("/", (req, res) => getAllPays(pool, req, res));
  router.post("/", (req, res) => createPays(pool, req, res));
  return router;
};
