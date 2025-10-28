import express from "express";
import msql from "mysql";
import cors from "cors";
import { PaysModel } from "./model/Pays.js";
import { EtudiantsModel } from "./model/Etudiants.js";

const app = express();
app.use(express.json());
app.use(cors());

const db = msql.createConnection({
  host: "localhost",
  user: "root",
  password: "de34%124",
  database: "dbecole"
});

// Route GET /pays
app.get("/pays", (req, res) => {
  const q = `SELECT * FROM ${PaysModel.table}`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Route POST /etudiants
app.post("/etudiants", (req, res) => {
  const q = `INSERT INTO ${EtudiantsModel.table} (Name, Age) VALUES (?)`;
  const values = [req.body.Name, req.body.Age];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("L'étudiant a été créé avec succès");
  });
});

app.listen(2083, () => {
  console.log("Connected to backend!");
});
