import express from "express";
import { getAllMeta } from "../Controllers/metaController.js";
const router = express.Router();

router.get("/all", getAllMeta);

export default router;
