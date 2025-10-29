import sql from "mssql";
import { PrestatairesModel } from "../Model/Prestataires.js";

//  Créer un nouveau prestataire
export const createPrestataire = async (pool, req, res) => {
  try {
    const data = req.body;

    const request = pool.request();
    PrestatairesModel.columns.slice(1).forEach((col) => {
      request.input(col, sql.VarChar, data[col] || PrestatairesModel.defaults[col] || null);
    });

    await request.query(`
      INSERT INTO ${PrestatairesModel.table} (${PrestatairesModel.columns.slice(1).join(", ")})
      VALUES (${PrestatairesModel.columns.slice(1).map(col => `@${col}`).join(", ")})
    `);

    res.json(" Prestataire ajouté avec succès");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Modifier un prestataire existant
export const updatePrestataire = async (pool, req, res) => {
  try {
    const data = req.body;
    const { ID_Prestataires } = data;

    if (!ID_Prestataires) return res.status(400).json({ error: "ID_Prestataires manquant" });

    const request = pool.request().input("ID_Prestataires", sql.Int, ID_Prestataires);
    PrestatairesModel.columns.slice(1).forEach((col) => {
      request.input(col, sql.VarChar, data[col] || PrestatairesModel.defaults[col] || null);
    });

    await request.query(`
      UPDATE ${PrestatairesModel.table}
      SET ${PrestatairesModel.columns.slice(1).map(col => `${col} = @${col}`).join(", ")}
      WHERE ID_Prestataires = @ID_Prestataires
    `);

    res.json(" Prestataire modifié avec succès");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Vérifier s’il existe un prestataire
export const checkPrestataireExistence = async (pool, req, res) => {
  try {
    const result = await pool.request().query(`SELECT TOP 1 ID_Prestataires FROM ${PrestatairesModel.table}`);
    if (result.recordset.length > 0) {
      res.json({ exists: true, id: result.recordset[0].ID_Prestataires });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//
export const getPrestataireById = async (pool, req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.request()
      .input("ID_Prestataires", sql.Int, id)
      .query(`SELECT * FROM Prestataires WHERE ID_Prestataires = @ID_Prestataires`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Prestataire introuvable" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
