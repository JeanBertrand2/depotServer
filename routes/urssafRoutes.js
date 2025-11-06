import express from "express";
import { postApi } from "../Controllers/apiController.js";

const router = express.Router();

router.post("/particulier", async (req, res) => {
  try {
    const result = await postApi(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
