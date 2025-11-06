import express from "express";
import { postApi } from "../Controllers/apiController.js";

const router = express.Router();
const URSSAF_API_URL = process.env.URSSAF_API_URL;

router.post("/particulier", async (req, res) => {
  try {
    const result = await postApi(URSSAF_API_URL, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
