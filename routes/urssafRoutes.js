import express from "express";
import axios from "axios";
import { getToken } from "../Controllers/apiController.js";

const router = express.Router();
const URSSAF_API_URL = process.env.URSSAF_API_URL;

router.post("/particulier", async (req, res) => {
  try {
    const data = req.body;
    const token = await getToken();
    const response = await axios.post(URSSAF_API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Erreur URSSAF:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
});

export default router;
