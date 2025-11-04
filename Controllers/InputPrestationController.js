import db from "../config/db.js";
import { InputPrestation } from "../Model/InputPrestation.js";

// Créer une ligne de prestation
export const createInputPrestation = (req, res) => {
  const data = req.body || {};

  const columns = InputPrestation.columns.filter(c => c !== "id_InputPrestation");
  const values = columns.map(col => data[col] ?? InputPrestation.defaults[col] ?? null);

  const placeholders = "(" + columns.map(() => "?").join(",") + ")";
  const sql = `INSERT INTO ${InputPrestation.table} (${columns.join(",")}) VALUES ${placeholders}`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la prestation :", err);
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }
    return res.status(201).json({ message: "Prestation ajoutée avec succès", id: result.insertId });
  });
};


