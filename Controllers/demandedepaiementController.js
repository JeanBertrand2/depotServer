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


export const rechercherPaiements = (req, res) => {
  const { dateDebut, dateFin, factures } = req.body;
  console.log("Requête reçue :", req.body);
  if (!dateDebut || !dateFin) {
    return res.status(400).json({ error: "Date début et fin obligatoires" });
  }

  let sql = `
    SELECT 
      dp.id_DemandePaiement AS idDemande,
      dp.dateFacture AS datefacture,
      dp.dateDebutEmploi AS debutEmploi,
      dp.dateFinEmploi AS finEmploi,
      dp.idClient,
      p.nomUsage AS nom,
      p.prenoms AS prenom,
      p.p_dateNaissance AS naissance,
      dp.idClient_numFactureTiers AS numFacture,
      dp.dateVersementAcompte AS dateAcompte,
      dp.mntAcompte AS montant,
      dp.idTiersFacturation AS idTiers,
      dp.mntFactureTTC,
      dp.mntFactureHT,
      dp.statut,
      dp.statutlibelle,
      dp.inforejet,
      dp.inforejetcommentaire,
      dp.mntVirement,
      dp.dateVirement
    FROM DemandePaiement dp
    LEFT JOIN Particulier p ON p.ID_Particulier = dp.ID_Particulier
    WHERE dp.dateFacture >= ? AND dp.dateFacture <= ?
  `;

  const params = [dateDebut, dateFin];

  if (factures && factures.trim() !== "") {
    const factureList = factures
      .split(",")
      .map(f => f.trim())
      .filter(f => f !== "");

    if (factureList.length > 0) {
      sql += ` AND dp.idClient_numFactureTiers IN (${factureList.map(() => "?").join(",")})`;
      params.push(...factureList);
    }
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
    const total = results.length;
    res.json({
    total,
    data: results
  });
  });
};
