import db from "../config/db.js";
import { DonneesBaseComboModel } from "../Model/DonneesBaseCombo.js";

export const getAllDonneesBaseCombo = (req, res) => {
  const sql = `SELECT ${DonneesBaseComboModel.columns.join(", ")} FROM ${DonneesBaseComboModel.table}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des données combo :", err);
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }
    res.json(results);
  });
};