import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import sql from "mssql";

import paysRoutes from "./Routes/paysRoutes.js"; 
import prestatairesRoutes from "./Routes/prestatairesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 2083;

// Configuration SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// Connexion SQL Server
sql.connect(config).then(pool => {
  console.log(" Connexion SQL Server réussie");

  // Routes API
  app.use("/api/pays", paysRoutes(pool));
  app.use("/api/prestataires", prestatairesRoutes(pool));

  app.listen(PORT, () => {
    console.log(` Serveur lancé sur le port ${PORT}`);
    console.log(" Utilisateur :", process.env.DB_USER);
    console.log(" Base :", process.env.DB_NAME);
  });

}).catch(err => {
  console.error(" Erreur de connexion SQL Server :", err);
});
