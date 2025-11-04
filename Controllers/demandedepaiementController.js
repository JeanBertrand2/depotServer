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
      dp.numFactureTiers AS numFacture,
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
    WHERE 1 = 1
  `;

  const params = [];

  // Filtre par date si fourni
  if (dateDebut && dateFin) {
    sql += ` AND dp.dateFacture >= ? AND dp.dateFacture <= ?`;
    params.push(dateDebut, dateFin);
  }

  // Filtre par facture si fourni
  if (factures && typeof factures === "string" && factures.trim() !== "") {
    const factureList = factures
      .split(",")
      .map(f => f.trim())
      .filter(f => f !== "");

    if (factureList.length > 0) {
      sql += ` AND dp.numFactureTiers IN (${factureList.map(() => "?").join(",")})`;
      params.push(...factureList);
    }
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ error: "Erreur serveur", details: err.message });
    }

    res.json({
      total: results.length,
      data: results
    });
  });
};
const normalizeMontant = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0.00 : num;
};

export const interrogerPaiements = async (req, res) => {
  const { dateDebut, dateFin, factures } = req.body;
  const factureList = (factures || "")
    .split(",")
    .map(f => f.trim())
    .filter(f => f !== "");

  const results = [];

  for (const numFacture of factureList) {
    try {
      // Appel à l’API URSSAF (à adapter selon ton endpoint)
      const apiResponse = await fetch(`https://api.urssaf.fr/paiement/${numFacture}`);
      const data = await apiResponse.json();

      const dp = {
        idDemandePaiement: data.idDemandePaiement,
        idClient: data.demandePaiement.idClient,
        idTiersFacturation: data.demandePaiement.idTiersFacturation,
        numFactureTiers: data.demandePaiement.numFactureTiers,
        dateFacture: data.demandePaiement.dateFacture,
        dateDebutEmploi: data.demandePaiement.p_dateDebutEmploi,
        dateFinEmploi: data.demandePaiement.p_dateFinEmploi,
        mntAcompte: normalizeMontant(data.demandePaiement.mntAcompte),
        dateVersementAcompte: data.demandePaiement.dateVersementAcompte,
        mntFactureTTC: normalizeMontant(data.demandePaiement.mntFactureTTC),
        mntFactureHT: normalizeMontant(data.demandePaiement.mntFactureHT),
        statut: data.statut.code,
        statutlibelle: data.statut.libelle,
        inforejet: data.infoRejet.code,
        inforejetcommentaire: data.infoRejet.commentaire,
        mntVirement: normalizeMontant(data.infoVirement.mntVirement),
        dateVirement: data.infoVirement.p_dateVirement,
        dateHeureModification: new Date()
      };

      // Vérifie si la facture existe déjà
      const [existing] = await db.query(
        "SELECT * FROM DemandePaiement WHERE numFactureTiers = ?",
        [numFacture]
      );


      if (existing.length > 0) {
        await db.query("UPDATE DemandePaiement SET ? WHERE numFactureTiers = ?", [dp, numFacture]);

      } else {
        await db.query("INSERT INTO DemandePaiement SET ?", [dp]);
      }

      results.push(dp);
    } catch (err) {
      console.error(`Erreur pour ${numFacture} :`, err.message);
    }
  }

  res.json({ total: results.length, data: results });
};
