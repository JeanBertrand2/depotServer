import db from "../config/db.js";
import { PrestatairesModel } from "../Model/Prestataires.js";

// Créer un nouveau prestataire
export const createPrestataire = (req, res) => {
  const data = req.body || {};

  const columns = PrestatairesModel.columns.filter(c => c !== "ID_Prestataires");
  const values = columns.map(col => data[col] ?? PrestatairesModel.defaults[col] ?? null);

  const placeholders = "(" + columns.map(() => "?").join(",") + ")";
  const sql = `INSERT INTO ${PrestatairesModel.table} (${columns.join(",")}) VALUES ${placeholders}`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout du prestataire :", err);
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }
    return res.status(201).json({ message: "Prestataire ajouté avec succès", id: result.insertId });
  });
};

// Modifier un prestataire existant
export const updatePrestataire = (req, res) => {
  const data = req.body || {};
  const { ID_Prestataires } = data;

  if (!ID_Prestataires) {
    return res.status(400).json({ error: "ID_Prestataires manquant" });
  }

  const columns = PrestatairesModel.columns.filter(c => c !== "ID_Prestataires");
  const updates = columns.map(col => `${col} = ?`).join(", ");
  const values = columns.map(col => data[col] ?? PrestatairesModel.defaults[col] ?? null);

  const sql = `UPDATE ${PrestatairesModel.table} SET ${updates} WHERE ID_Prestataires = ?`;
  db.query(sql, [...values, ID_Prestataires], (err, result) => {
    if (err) {
      console.error("Erreur lors de la modification du prestataire :", err);
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }
    return res.json({ message: "Prestataire modifié avec succès" });
  });
};

// Vérifier s’il existe un prestataire
export const checkPrestataireExistence = (req, res) => {
  const sql = `SELECT ID_Prestataires FROM ${PrestatairesModel.table} LIMIT 1`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }
    if (results.length > 0) {
      res.json({ exists: true, id: results[0].ID_Prestataires });
    } else {
      res.json({ exists: false });
    }
  });
};

// Récupérer un prestataire par ID
export const getPrestataireById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM ${PrestatairesModel.table} WHERE ID_Prestataires = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Prestataire introuvable" });
    }
    res.json(results[0]);
  });
};

export const getUrssafParams = (req, res) => {
  const sql = `
    SELECT 
      ClientIDProduction, ClientSecretProduction, ScopeProduction, UrlTokenProduction, UrlRequeteProduction,
      ClientIDSandBox, ClientSecretSandBox, ScopeSandBox, UrlTokenSandBox, UrlRequeteSandBox
    FROM ${PrestatairesModel.table}
    LIMIT 1
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des paramètres URSSAF :", err);
      return res.status(500).json({ error: "Erreur base de données", details: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Aucun prestataire trouvé" });
    }

    const row = results[0];
    res.json({
      production: {
        clientID: row.ClientIDProduction,
        clientSecret: row.ClientSecretProduction,
        scope: row.ScopeProduction,
        urlToken: row.UrlTokenProduction,
        urlRequete: row.UrlRequeteProduction,
      },
      sandbox: {
        clientID: row.ClientIDSandBox,
        clientSecret: row.ClientSecretSandBox,
        scope: row.ScopeSandBox,
        urlToken: row.UrlTokenSandBox,
        urlRequete: row.UrlRequeteSandBox,
      },
    });
  });
}; 
