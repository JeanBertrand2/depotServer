import sql from "mssql";
import { PaysModel } from "../Model/Pays.js";

export const getAllPays = async (pool, req, res) => {
  try {
    const result = await pool.request().query(`SELECT * FROM ${PaysModel.table}`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPays = async (pool, req, res) => {
  try {
    const { nomPays, codePays } = req.body;
    await pool.request()
      .input("nomPays", sql.VarChar, nomPays)
      .input("codePays", sql.VarChar, codePays)
      .query(`INSERT INTO ${PaysModel.table} (nomPays, codePays) VALUES (@nomPays, @codePays)`);
    res.json("Le pays a été ajouté avec succès");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
