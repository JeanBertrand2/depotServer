import db from "../config/db.js";
import { Intervenant } from "../Model/Intervenant.js";

export const createIntervenant = (req, res) => {
  const { civilite, nomIntervenant, prenomIntervenant } = req.body;
  // Input validation for required fields
  const missingFields = [];
  if (!civilite) missingFields.push("civilite");
  if (!nomIntervenant) missingFields.push("nomIntervenant");
  if (!prenomIntervenant) missingFields.push("prenomIntervenant");
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missingFields
    });
  }
  const query = `INSERT INTO ${Intervenant.tableName} (civilite, nomIntervenant, prenomIntervenant) VALUES (?, ?, ?)`;
  db.query(
    query,
    [civilite, nomIntervenant, prenomIntervenant],
    (error, results) => {
      if (error) {
        console.error("Error creating intervenant:", error);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
};

export const getAllIntervenants = (req, res) => {
  const query = `SELECT * FROM ${Intervenant.tableName}`;
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching intervenants:", error);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json(results);
  });
};

export const getIntervenantById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM ${Intervenant.tableName} WHERE ID_Intervenant = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching intervenant:", error);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Intervenant not found" });
    }
    return res.status(200).json(results[0]);
  });
};
export const updateIntervenant = (req, res) => {
  const { id } = req.params;
  const { civilite, nomIntervenant, prenomIntervenant } = req.body;
  // Input validation: ensure at least one field is present
  if (
    (civilite === undefined || civilite === null || civilite === "") &&
    (nomIntervenant === undefined || nomIntervenant === null || nomIntervenant === "") &&
    (prenomIntervenant === undefined || prenomIntervenant === null || prenomIntervenant === "")
  ) {
    return res.status(400).json({ error: "At least one field (civilite, nomIntervenant, prenomIntervenant) must be provided for update." });
  }
  const query = `UPDATE ${Intervenant.tableName} SET civilite = ?, nomIntervenant = ?, prenomIntervenant = ? WHERE ID_Intervenant = ?`;
  db.query(
    query,
    [civilite, nomIntervenant, prenomIntervenant, id],
    (error, results) => {
      if (error) {
        console.error("Error updating intervenant:", error);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Intervenant not found" });
      }
      return res.status(200).json({ id, ...req.body });
    }
  );
};
export const deleteIntervenant = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM ${Intervenant.tableName} WHERE ID_Intervenant = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error deleting intervenant:", error);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Intervenant not found" });
    }
    return res.status(200).json({ id });
  });
};
