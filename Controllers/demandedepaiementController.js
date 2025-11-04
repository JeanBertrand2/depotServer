import db from "../config/db.js";
import { DemandePaiement } from "../Model/demandedepaiement.js";

//  Créer une nouvelle demande de paiement
export const createDemandePaiement = (req, res) => {
  const data = req.body || {};

  const columns = Object.keys(data);

  const values = columns.map(col => data[col] ?? null);

  const placeholders = "(" + columns.map(() => "?").join(",") + ")";
  const sql = `INSERT INTO ${DemandePaiement.table} (${columns.join(",")}) VALUES ${placeholders}`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la demande de paiement :", err);
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }
    return res.status(201).json({ message: "Demande de paiement ajoutée avec succès", id: result.insertId });
  });
};