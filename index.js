import express from "express";
import cors from "cors";
import intervenantRoutes from "./routes/intervenant.js";
import particuliersRoutes from "./routes/particulier.js";
import metaRoutes from "./routes/meta.js";
import prestatairesRoutes from "./routes/prestatairesRoutes.js";
import demandePRoutes from "./routes/demandedepaiementRoutes.js";
import InputPRoutes from "./routes/InputPrestationRoutes.js";
import donneesRoutes from "./routes/donneesRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/intervenants", intervenantRoutes);
app.use("/particuliers", particuliersRoutes);
app.use("/meta", metaRoutes);
app.use("/prestataires", prestatairesRoutes);
app.use("/demande", demandePRoutes);
app.use("/Input", InputPRoutes);
app.use("/api/majbdd", donneesRoutes);

app.listen(2083, () => {
  console.log("Connected to backend! on port 2083");
});
