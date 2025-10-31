import express from "express";
import cors from "cors";
import prestatairesRoutes from "./routes/particulier.js";
import metaRoutes from "./routes/meta.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/particuliers", prestatairesRoutes);
app.use("/meta", metaRoutes);

app.listen(2083, () => {
  console.log("Connected to backend!" + " on port 2083");
});
