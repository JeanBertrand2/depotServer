import db from "../config/db.js";
import { DemandePaiement } from "../Model/demandedepaiement.js";
import { postApi } from "./apiController.js";

//  Créer une nouvelle demande de paiement
export const createDemandePaiement = (req, res) => {
  const data = req.body || {};

  const columns = Object.keys(data);

  const values = columns.map((col) => data[col] ?? null);

  const placeholders = "(" + columns.map(() => "?").join(",") + ")";
  const sql = `INSERT INTO ${DemandePaiement.table} (${columns.join(
    ","
  )}) VALUES ${placeholders}`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la demande de paiement :", err);
      return res
        .status(500)
        .json({ error: "Erreur base de données", details: err.message });
    }
    return res
      .status(201)
      .json({
        message: "Demande de paiement ajoutée avec succès",
        id: result.insertId,
      });
  });
};

export const rechercherPaiements = (req, res) => {
  const { dateDebut, dateFin, factures } = req.body;
  console.log("Requête reçue :", req.body);

  let sql = `
    SELECT
     
      dp.idDemandePaiement ,
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
      .map((f) => f.trim())
      .filter((f) => f !== "");

    if (factureList.length > 0) {
      sql += ` AND dp.numFactureTiers IN (${factureList
        .map(() => "?")
        .join(",")})`;
      params.push(...factureList);
    }
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res
        .status(500)
        .json({ error: "Erreur serveur", details: err.message });
    }
    console.log("Résultat SQL :", results);

    res.json({
      total: results.length,
      data: results,
    });
  });
};
const normalizeMontant = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0.0 : num;
};

export const interrogerPaiements = async (req, res) => {
  const { dateDebut, dateFin, factures } = req.body;
  const factureList = (factures || "")
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f !== "");

  const results = [];

  for (const numFacture of factureList) {
    try {
      // Appel à l’API URSSAF (à adapter selon ton endpoint)
      const apiResponse = await fetch(
        `https://api.urssaf.fr/paiement/${numFacture}`
      );
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
        dateHeureModification: new Date(),
      };

      // Vérifie si la facture existe déjà
      const [existing] = await db.query(
        "SELECT * FROM DemandePaiement WHERE numFactureTiers = ?",
        [numFacture]
      );

      if (existing.length > 0) {
        await db.query(
          "UPDATE DemandePaiement SET ? WHERE numFactureTiers = ?",
          [dp, numFacture]
        );
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
// Récupérer la liste des factures sur une période
export const recupererListeFacturePeriode = (req, res) => {
  const { gf_sListeFacture, gf_dDatedebut, gf_dDateFin, gf_sStatutAExclure } =
    req.body;

  let sql = `SELECT idDemandePaiement,numFactureTiers FROM DemandePaiement WHERE numFactureTiers <> ''`;
  const params = [];

  if (Array.isArray(gf_sListeFacture) && gf_sListeFacture.length > 0) {
    const factureList = gf_sListeFacture
      .map((f) => f.trim())
      .filter((f) => f !== "");

    sql += ` AND numFactureTiers IN (${factureList.map(() => "?").join(",")})`;
    params.push(...factureList);
  } else {
    if (gf_dDatedebut) {
      sql += ` AND dateFacture >= ?`;
      params.push(gf_dDatedebut);
    }
    if (gf_dDateFin) {
      sql += ` AND dateFacture <= ?`;
      params.push(gf_dDateFin);
    }
    if (gf_sStatutAExclure) {
      sql += ` AND statut <> ?`;
      params.push(gf_sStatutAExclure);
    }
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res
        .status(500)
        .json({ error: "Erreur SQL", details: err.message });
    }

    res.json({
      total: results.length,
      gtabListeFacturePeriode: results,
    });
  });
};

export const envoyerVersUrssaf = async (req, res) => {
  console.log("Requête reçue 111:", req.body);

  const { payload } = req.body;
  console.log(" Payload reçu dans envoyerVersUrssaf :", payload);
  if (!payload || !payload.methode) {
    return res
      .status(400)
      .json({ error: "Méthode URSSAF manquante dans le payload" });
  }

  try {
    console.log(" Appel postApi avec :", payload);
    const result = await postApi(payload);

    res.json({ success: true, result });
  } catch (err) {
    console.error("Erreur URSSAF :", err.message);
    res.status(500).json({ error: "Échec de l'envoi vers URSSAF" });
  }
};




export const updateDemandePaiement = (req, res) => {
  const data = req.body || {};
  const id = req.params.id; // ← id_DemandePaiement

  if (!id) {
    return res.status(400).json({ error: "ID manquant pour la modification" });
  }

  // Vérifier que la demande existe
  db.query(
    "SELECT 1 FROM DemandePaiement WHERE id_DemandePaiement = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error("Erreur SQL lors de la vérification :", err);
        return res
          .status(500)
          .json({ error: "Erreur base de données", details: err.message });
      }

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Demande de paiement introuvable" });
      }

      // Aplatir les objets imbriqués
      const flatData = {
        idDemandePaiement: data.idDemandePaiement,
        idClient: data.idClient,
        idTiersFacturation: data.idTiersFacturation,
        numFactureTiers: data.numFactureTiers,
        dateFacture: data.dateFacture,
        dateDebutEmploi: data.dateDebutEmploi,
        dateFinEmploi: data.dateFinEmploi,
        mntAcompte: data.mntAcompte,
        dateVersementAcompte: data.dateVersementAcompte,
        mntFactureTTC: data.mntFactureTTC,
        mntFactureHT: data.mntFactureHT,
        statut: data.statut?.code || null,
        statutlibelle: data.statut?.libelle || null,
        inforejet: data.infoRejet?.code || null,
        inforejetcommentaire: data.infoRejet?.commentaire || null,
        mntVirement: data.infoVirement?.mntVirement || null,
        dateVirement: data.infoVirement?.dateVirement || null,
        dateHeureModification: new Date(),
      };

      const columns = Object.keys(flatData);
      const values = columns.map((col) => flatData[col]);
      const setClause = columns.map((col) => `${col} = ?`).join(", ");
      const sql = `UPDATE DemandePaiement SET ${setClause} WHERE id_DemandePaiement = ?`;

      db.query(sql, [...values, id], (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de la modification de la demande de paiement :",
            err
          );
          return res
            .status(500)
            .json({ error: "Erreur base de données", details: err.message });
        }

        return res
          .status(200)
          .json({
            message: "Demande de paiement modifiée avec succès",
            id_DemandePaiement: id,
          });
      });
    }
  );
};

export const interrogerViaBackend = async (req, res) => {
  try {
    const payload = req.body;

    console.log("Payload reçu dans interrogerViaBackend :", payload);

    const result = await postApiLegacy(payload);

    res.json(result);
  } catch (err) {
    console.error("Erreur dans interrogerViaBackend :", err.message);
    res.status(500).json({
      error: "Erreur lors de l'appel à URSSAF",
      details: err.message,
    });
  }
};

// Fonction utilitaire pour rendre les requêtes MySQL compatibles avec async/await
const queryAsync = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const upsertDemandePaiement = async (req, res) => {
  const data = req.body;
  const numFacture = (data.numFactureTiers || "").trim().toUpperCase();

  if (!numFacture) {
    return res.status(400).json({ error: "numFactureTiers manquant" });
  }

  const dp = {
    idDemandePaiement: data.idDemandePaiement,
    idClient: data.idClient,
    idTiersFacturation: data.idTiersFacturation,
    numFactureTiers: numFacture,
    dateFacture: data.dateFacture,
    dateDebutEmploi: data.dateDebutEmploi,
    dateFinEmploi: data.dateFinEmploi,
    mntAcompte: data.mntAcompte,
    dateVersementAcompte: data.dateVersementAcompte,
    mntFactureTTC: data.mntFactureTTC,
    mntFactureHT: data.mntFactureHT,
    statut: data.statut?.code,
    statutlibelle: data.statut?.libelle,
    inforejet: data.infoRejet?.code,
    inforejetcommentaire: data.infoRejet?.commentaire,
    mntVirement: data.infoVirement?.mntVirement,
    dateVirement: data.infoVirement?.dateVirement,
    dateHeureModification: new Date(),
  };

  try {
    const existingRows = await queryAsync(
      "SELECT * FROM DemandePaiement WHERE numFactureTiers = ?",
      [numFacture]
    );

    console.log("Résultat SELECT :", existingRows);

    if (existingRows.length > 0) {
      const result = await queryAsync(
        `UPDATE DemandePaiement SET
          idDemandePaiement = ?,
          idClient = ?,
          idTiersFacturation = ?,
          dateFacture = ?,
          dateDebutEmploi = ?,
          dateFinEmploi = ?,
          mntAcompte = ?,
          dateVersementAcompte = ?,
          mntFactureTTC = ?,
          mntFactureHT = ?,
          statut = ?,
          statutlibelle = ?,
          inforejet = ?,
          inforejetcommentaire = ?,
          mntVirement = ?,
          dateVirement = ?,
          dateHeureModification = ?
        WHERE numFactureTiers = ?`,
        [
          dp.idDemandePaiement,
          dp.idClient,
          dp.idTiersFacturation,
          dp.dateFacture,
          dp.dateDebutEmploi,
          dp.dateFinEmploi,
          dp.mntAcompte,
          dp.dateVersementAcompte,
          dp.mntFactureTTC,
          dp.mntFactureHT,
          dp.statut,
          dp.statutlibelle,
          dp.inforejet,
          dp.inforejetcommentaire,
          dp.mntVirement,
          dp.dateVirement,
          dp.dateHeureModification,
          numFacture,
        ]
      );

      console.log("Lignes modifiées :", result.affectedRows);

      if (result.affectedRows > 0) {
        return res.json({ message: "Demande modifiée", facture: numFacture });
      } else {
        return res
          .status(200)
          .json({
            message: "Aucune modification nécessaire",
            facture: numFacture,
          });
      }
    } else {
      dp.dateHeureCreation = new Date();
      await queryAsync("INSERT INTO DemandePaiement SET ?", [dp]);
      return res
        .status(201)
        .json({ message: "Demande ajoutée", facture: numFacture });
    }
  } catch (err) {
    console.error("Erreur upsert :", err.message);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: err.message });
  }
};
