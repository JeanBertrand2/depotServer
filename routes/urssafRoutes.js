import express from "express";
import { postApi } from "../Controllers/apiController.js";
import { updateParticulier } from "../Controllers/particulierController.js";

const router = express.Router();

router.post("/particulier", async (req, res) => {
  try {
    const result = await postApi(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/getStatut", async (req, res) => {
  // const urlParams = new URLSearchParams(req.originalUrl.split('?')[1]);
  // const params = Object.fromEntries(urlParams.entries());
  // const url = params.url;
  // const idClient = params.idClient;
  const params = req.body.params;
  const url = req.body.url;
  console.log("url = ",url);
   try {
     const result = await getApi(url,params);
     if(result!=null)
     {
      updateParticulier(result);
     }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
