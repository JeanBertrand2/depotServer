import express from "express";
import cors from "cors";
import particulierRoutes from "./routes/particulier.js";
import metaRoutes from "./routes/meta.js";
import intervenantRoutes from "./routes/intervenant.js";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/particuliers", particulierRoutes);
app.use("/meta", metaRoutes);
app.use("/intervenants", intervenantRoutes);

app.listen(2083, () => {
  console.log("Connected to backend!" + " on port 2083");
});
