import db from "../config/db.js";
import { ParticulierModel } from "../Model/Particulier.js";

export const createParticulier = (req, res) => {
  const body = req.body || {};
  const required = [
    "civilite",
    "nomNaissance",
    "prenoms",
    "dateNaissance",
    "codePaysNaissance",
    "departementNaissance",
    "codeCommune_Naissance",
    "libelleCommune_Naissance",
  ];

  const missing = required.filter(
    (f) =>
      body[f] === undefined || body[f] === null || String(body[f]).trim() === ""
  );
  if (missing.length) {
    return res
      .status(400)
      .json({ error: "Missing required fields", fields: missing });
  }

  const columns = ParticulierModel.columns.filter(
    (c) => c !== "ID_Particulier"
  );

  const values = columns.map((col) => {
    return body[col] !== undefined ? body[col] : null;
  });

  const placeholders = "(" + columns.map(() => "?").join(",") + ")";
  const sql = `INSERT INTO ${ParticulierModel.table} (${columns.join(
    ","
  )}) VALUES ${placeholders}`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting Particulier:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }
    return res
      .status(201)
      .json({ message: "Particulier created", id: result.insertId });
  });
};
