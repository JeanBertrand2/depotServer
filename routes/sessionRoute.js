import express from "express";
import {  getSession,WriteSession } from "../Controllers/sessionController.js";

const router = express.Router();

  router.get("/",getSession);
  router.post("/",WriteSession);
 export default router;