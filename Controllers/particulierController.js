import db from "../config/db.js";
import { ParticulierModel } from "../Model/Particulier.js";

export const getParticulier= (req, res) => {
const query = `SELECT * FROM ${ParticulierModel.table}`;
  db.query(query, (error, data) => {
    if (error) {  
      console.log("liste particulier error : ");   
      return res.status(500).json({ error: "Erreur de la base de données" });
    }
    console.log("liste particulier : ",data);
    return res.status(200).json(data);
  });
}

export const createParticulier = (req, res) => {
  const body = req.body || {};

  const getByPath = (obj, path) =>
    path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
        obj
      );

  const columnPathMap = {
    codePaysNaissance: [
      "lieuNaissance.codePaysNaissance",
      "adressePostale.codePays",
    ],
    departementNaissance: ["lieuNaissance.departementNaissance"],
    codeCommune_Naissance: [
      "lieuNaissance.communeNaissance.codeCommune",
      "lieuNaissance.codeCommune",
    ],
    libelleCommune_Naissance: [
      "lieuNaissance.communeNaissance.libelleCommune",
      "lieuNaissance.libelleCommune",
    ],
    numeroVoie: ["adressePostale.numeroVoie"],
    lettreVoie: ["adressePostale.lettreVoie"],
    codeTypeVoie: ["adressePostale.codeTypeVoie"],
    libelleVoie: ["adressePostale.libelleVoie"],
    complement: ["adressePostale.complement"],
    lieuDit: ["adressePostale.lieuDit"],
    libelleCommune: ["adressePostale.libelleCommune"],
    codeCommune: ["adressePostale.codeCommune"],
    codePostal: ["adressePostale.codePostal"],
    codePays: ["adressePostale.codePays"],
    bic: ["coordonneeBancaire.bic"],
    iban: ["coordonneeBancaire.iban"],
    IBAN: ["coordonneeBancaire.iban"],
    libelleCommune_Adresse: ["adressePostale.libelleCommune"],
    codeCommune_Adresse: ["adressePostale.codeCommune"],
    titulaire: ["coordonneeBancaire.titulaire"],
  };

  const resolveField = (col) => {
    if (body[col] !== undefined) return body[col];

    const mapped = columnPathMap[col];
    if (mapped) {
      for (const path of mapped) {
        const v = getByPath(body, path);
        if (v !== undefined) return v;
      }
    }

    for (const k of Object.keys(body)) {
      const nested = body[k];
      if (
        nested &&
        typeof nested === "object" &&
        !Array.isArray(nested) &&
        nested[col] !== undefined
      ) {
        return nested[col];
      }
    }

    return undefined;
  };

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

  const missing = required.filter((f) => {
    const v = resolveField(f);
    return v === undefined || v === null || String(v).trim() === "";
  });

  if (missing.length) {
    return res
      .status(400)
      .json({ error: "Missing required fields", fields: missing });
  }

  const columns = ParticulierModel.columns.filter(
    (c) => c !== "ID_Particulier"
  );

  const values = columns.map((col) => {
    const v = resolveField(col);
    return v !== undefined ? v : null;
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
