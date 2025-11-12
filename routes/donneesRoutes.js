import express from "express";
import {  parcourirFichiersExcel } from "../Controllers/donneesController.js";

const router = express.Router();


  router.get("/",parcourirFichiersExcel);
 export default router;
